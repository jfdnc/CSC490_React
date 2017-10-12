//for receiving actions via dispatcher
import dispatcher from '../Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'

class LogStore extends EventEmitter {
  constructor(props){
    super(props)

    //initial log info
    this.logInfo = {
      loggedIn: false,
      userType: "guest"
    }
  }

  getLogState(){
    return this.logInfo.loggedIn
  }

  getUserType(){
    return this.logInfo.userType
  }

  logInOrg(){
    this.logInfo = {
      loggedIn: true,
      userType: 'org'
    }
    this.emit("change")
  }

  logInUser(){
    this.logInfo = {
      loggedIn: true,
      userType: "org"
    }
    this.emit("change")
  }

  logOut(){
    this.logInfo = {
      loggedIn: false,
      userType: "guest"
    }
    this.emit("change")
  }

  displayHome(type){
    this.logInfo = {
      loggedIn: this.logInfo.loggedIn,
      userType: type
    }
    this.emit("change")
  }

  displayRegister(){
    this.logInfo = {
      loggedIn: this.logInfo.loggedIn,
      userType: 'register'
    }
    this.emit("change")
  }

  displayLogin(){
    this.logInfo = {
      loggedIn: this.logInfo.loggedIn,
      userType: 'login'
    }
    this.emit("change")
  }

  displayAbout(){
    this.logInfo = {
      loggedIn: this.logInfo.loggedIn,
      userType: 'about'
    }
    this.emit("change")
  }

  displayContact(){
    this.logInfo = {
      loggedIn: this.logInfo.loggedIn,
      userType: 'contact'
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
      case 'LOG_IN_ORG':
        this.logInOrg()
        break
      case 'LOG_IN_USER':
        this.logInUser()
        break
      case 'LOG_OUT':
        this.logOut()
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
const logStore = new LogStore
//register dispatcher to this store to handle action passing
dispatcher.register(logStore.handleActions.bind(logStore))
export default logStore
