/*
this file will contain actions for UI components to emit
*/
import dispatcher from '../../data/Dispatcher'
import UserActionTypes from '../types/UserActionTypes'

var axios = require('axios')
//const config = { headers: { 'Content-Type': 'multipart/form-data' } };

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

export function createUser(user){
  dispatcher.dispatch({
    type: UserActionTypes.CREATE_USER,
    user: user
  })
    axios.post('localhost:3000/api/users', {
      email: 'email@email.com'
    })
        .then(function(res){
          console.log("API CALL")
        })
        .catch(function(err){
          console.log(err)
        })
}

/* to export all functions
export default {
  getLogState,
  getUserType,
  logOut,
  viewVolopUser,
  saveVolop,
  shareVolop,
  editPrefs
}
*/
