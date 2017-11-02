/*
this file will contain actions for UI components to emit
*/
import dispatcher from '../data/Dispatcher'
import UserActionTypes from '../action_types/UserActionTypes'

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
    let myReq = new Request('/auth/signup', {method:'POST', body: JSON.stringify(user),
        headers: {"Content-Type": "application/json"}})
    fetch(myReq)
        .then(function(res){
            console.log(res)
        })
        .catch(function(err){
            console.log(err)
        })

    dispatcher.dispatch({
        type: UserActionTypes.CREATE_USER,
        user: user
    })

}

export function loginUser(user){
    //make API call to login user
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    if (xhr.status === 200) {
        // success so save the token
        localStorage.setItem('token', xhr.response.token);
    }
    xhr.send(user);
    console.log(xhr.response)
    //send to dispatcher
    dispatcher.dispatch({
        type: UserActionTypes.LOGIN_USER,
        user: user
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
