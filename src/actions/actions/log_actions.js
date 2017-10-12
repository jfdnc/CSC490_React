/*
NOT USING FOR NOW
*/
import dispatcher from '../data/Dispatcher'
import ActionTypes from '../types/ActionTypes'

//return t/f on loggedIn state
export function getLogState(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: ActionTypes.GET_LOG_STATE
  })
}
//return string on user type state (guest, user, org)
export function getUserType(){
  dispatcher.dispatch({
    type: ActionTypes.GET_USER_TYPE
  })
}

//attempt login as org, TODO: add login params
export function logInOrg(){
  dispatcher.dispatch({
    type: ActionTypes.LOG_IN_ORG
  })
}
//attempt login as user, TODO: add login params
export function logInUser(){
  dispatcher.dispatch({
    type: ActionTypes.LOG_IN_USER
  })
}

//return t/f on successful log out
export function logOut(){
  dispatcher.dispatch({
    type: ActionTypes.LOG_OUT
  })
}

/* to export all functions
export default {
  getLogState,
  getUserType,
  logInOrg,
  logInUser,
  logOut
}
*/
