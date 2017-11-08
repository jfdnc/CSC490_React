//for receiving actions via dispatcher
import dispatcher from '../Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'
import DisplayActionTypes from '../../action_types/DisplayActionTypes'

class DisplayStore extends EventEmitter {
  constructor(props){
    super(props)

    //initial log info
    this.displayState = {
      loggedIn: false,
      //userType: 'guest',
      displayType: 'guest',
      userType: 'guest'
      //userType: 'user'
    }
  }

  getLogState(){
    return this.displayState.loggedIn
  }

  getDisplayType(){
    return this.displayState.displayType
  }

  getUserType(){
    return this.displayState.userType
  }

  getAll(){
    return this.displayState
  }

  //call on log in or log out
  updateDisplayUserType(newUserType){
    let prevUserType = this.displayState.userType

    if(newUserType == 'guest' && prevUserType != 'guest'){
      this.displayState = {
        loggedIn: false,
        userType: 'guest',
        displayType: 'guest',
      }
      this.emit('change')
    } else if(newUserType == 'user' && prevUserType == 'guest'){
        this.displayState = {
          loggedIn: true,
          userType: 'user',
          displayType: 'user',
        }
        this.emit('change')
    } else if(newUserType == 'org' && prevUserType == 'guest'){
        this.displayState = {
          loggedIn: true,
          userType: 'org',
          displayType: 'org',
        }
        this.emit('change')
    } else {
      console.log('error in updateDisplayUserType')
    }
  }

  displayHome(){
    this.displayState = {
      loggedIn: this.displayState.loggedIn,
      userType: this.displayState.userType,
      displayType: this.displayState.userType
    }
    this.emit("change")
  }

  displayRegister(){
    this.displayState = {
      loggedIn: this.displayState.loggedIn,
      userType: this.displayState.userType,
      displayType: 'register'
    }
    this.emit("change")
  }

  displayLogin(){
    this.displayState = {
      loggedIn: this.displayState.loggedIn,
      userType: this.displayState.userType,
      displayType: 'login'
    }
    this.emit("change")
  }

  displayAbout(){
    this.displayState = {
      loggedIn: this.displayState.loggedIn,
      userType: this.displayState.userType,
      displayType: 'about'
    }
    this.emit("change")
  }

  displayContact(){
    this.displayState = {
      loggedIn: this.displayState.loggedIn,
      userType: this.displayState.userType,
      displayType: 'contact'
    }
    this.emit("change")
  }

  /*
  switch on action type to determine what to do with action from dispatcher
  */
  handleActions(action){
    switch(action.type){
      case DisplayActionTypes.UPDATE_DISPLAY_USER_TYPE:
        this.updateDisplayUserType(action.newUserType)
      break
      case DisplayActionTypes.DISPLAY_HOME:
        this.displayHome()
      break
      case DisplayActionTypes.DISPLAY_REGISTER:
        this.displayRegister()
      break
      case DisplayActionTypes.DISPLAY_LOGIN:
        this.displayLogin()
      break
      case DisplayActionTypes.DISPLAY_ABOUT:
        this.displayAbout()
      break
      case DisplayActionTypes.DISPLAY_CONTACT:
        this.displayContact()
      break
      default:
      break
    }
  }
}

/*
create new instance of this store type to export
files importing TestStore get this new instance of TestStore
*/
const displayStore = new DisplayStore
//register dispatcher to this store to handle action passing
dispatcher.register(displayStore.handleActions.bind(displayStore))
export default displayStore
