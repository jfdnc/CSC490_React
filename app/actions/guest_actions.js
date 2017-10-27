/*
this file will contain actions for UI components to emit
*/
import dispatcher from '../data/Dispatcher'
import GuestActionTypes from '../action_types/GuestActionTypes'

//return t/f on loggedIn state
export function getLogState(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: GuestActionTypes.GET_LOG_STATE
  })
}

//return string on user type state (guest, user, org)
export function getUserType(){
  dispatcher.dispatch({
    type: GuestActionTypes.GET_USER_TYPE
  })
}

//attempt login as org, return t/f on success and info, TODO: add login params
export function logInOrg(){
  dispatcher.dispatch({
    type: GuestActionTypes.LOG_IN_ORG
  })
}
//attempt login as user, return t/f on success and info, TODO: add login params
export function logInUser(){
  dispatcher.dispatch({
    type: GuestActionTypes.LOG_IN_USER
  })
}

//return volOps object array based on given category and zip
export function catZipSearch(){
  dispacher.dispatch({
    type: GuestActionTypes.CAT_ZIP_SEARCH
  })
}

/* to export all functions
export default {
  getLogState,
  getUserType,
  logInOrg,
  logInUser,
  catZipSearch
}
*/
