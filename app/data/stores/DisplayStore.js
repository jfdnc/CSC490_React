//for receiving actions via dispatcher
import dispatcher from '../Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'

class DisplayStore extends EventEmitter {
  constructor(props){
    super(props)

    //initial log info
    this.displayInfo = {
      loggedIn: false,
      userType: "guest",
      displayType: "guest"
    }
  }

  getLogState(){
    return this.displayInfo.loggedIn
  }

  getUserType(){
    return this.displayInfo.displayType
  }

  displayHome(type){
    this.displayInfo = {
      loggedIn: this.displayInfo.loggedIn,
      displayType: type
    }
    this.emit("change")
  }

  displayRegister(){
    this.displayInfo = {
      loggedIn: this.displayInfo.loggedIn,
      displayType: 'register'
    }
    this.emit("change")
  }

  displayLogin(){
    this.displayInfo = {
      loggedIn: this.displayInfo.loggedIn,
      displayType: 'login'
    }
    this.emit("change")
  }

  displayAbout(){
    this.displayInfo = {
      loggedIn: this.displayInfo.loggedIn,
      displayType: 'about'
    }
    this.emit("change")
  }

  displayContact(){
    this.displayInfo = {
      loggedIn: this.displayInfo.loggedIn,
      displayType: 'contact'
    }
    this.emit("change")
  }

  /*
  switch on action type to determine what to do with action from dispatcher
  */
  handleActions(action){
    switch(action.type){
      case 'GET_LOG_STATE':
        this.getLogState()
        break
      case 'GET_USER_TYPE':
        this.getUserType()
        break
      case 'DISPLAY_HOME':
        this.displayHome()
        break
      case 'DISPLAY_REGISTER':
        this.displayRegister()
        break
      case 'DISPLAY_LOGIN':
        this.displayLogin()
        break
      case 'DISPLAY_ABOUT':
        this.displayAbout()
        break
      case 'DISPLAY_CONTACT':
        this.displayContact()
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
