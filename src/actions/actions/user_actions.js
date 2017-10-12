/*
this file will contain actions for UI components to emit
*/
import dispatcher from '../../data/Dispatcher'
import UserActionTypes from '../types/UserActionTypes'

//return t/f on loggedIn state
export function getLogState(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: UserActionTypes.GET_LOG_STATE
  })
}

//return string on user type state (guest, user, org)
export function getUserType(){
  dispatcher.dispatch({
    type: UserActionTypes.GET_USER_TYPE
  })
}

//return t/f on successful log out
export function logOut(){
  dispatcher.dispatch({
    type: UserActionTypes.LOG_OUT
  })
}

//display about page
export function displayAbout(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: UserActionTypes.DISPLAY_ABOUT
  })
}

//display contact page
export function displayContact(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: UserActionTypes.DISPLAY_CONTACT
  })
}

//return more info about selected volop for user view
export function viewVolopUser(){
  dispatcher.dispatch({
    type: UserActionTypes.VIEW_VOLOP_USER
  })
}

//return t/f on volop saved
export function saveVolop(){
  dispatcher.dispatch({
    type: UserActionTypes.SAVE_VOLOP
  })
}

export function shareVolop(){
  dispatcher.dispatch({
    type: UserActionTypes.SHARE_VOLOP
  })
}

export function editPrefs(){
  dispatcher.dispatch({
    type: UserActionTypes.EDIT_PREFS
  })
}

}

/* to export all functions
export default {
  getLogState,
  getUserType,
  logOut,
  displayAbout,
  displayContact,
  viewVolopUser,
  saveVolop,
  shareVolop,
  editPrefs
}
*/
