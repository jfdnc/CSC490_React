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
    //remove the token from local storage
    return new Promise((resolve, reject) =>{
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')

      dispatcher.dispatch({
          type: UserActionTypes.LOG_OUT
      })
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
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/auth/signup');
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
              //send to dispatcher
              dispatcher.dispatch({
                  type: UserActionTypes.CREATE_USER,
                  user: xhr.response.user
              })
          }
      });
      xhr.send(JSON.stringify(user))
  })
}

export function loginUser(user){
  //make API call to login user
  //return promise to login in Login
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/loginuser');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            // success so save the token
            localStorage.setItem('token', xhr.response.token);
            localStorage.setItem('userInfo', JSON.stringify(xhr.response.user))
            //send to dispatcher
            dispatcher.dispatch({
                type: UserActionTypes.LOGIN_USER,
                user: xhr.response.user
            })
        }
    });
    xhr.send(user)
  })
}

export function addToCal(volOpID){
  
}

export function initFBState(token,user){
    
    
return new Promise((resolve, reject) => {
        
        
            // success so save the token
            localStorage.setItem('token', token);
            localStorage.setItem('userInfo', JSON.stringify(user))
            

            //send to dispatcher            
            
            dispatcher.dispatch({
                type: UserActionTypes.INIT_FBUSER,
                user: user
                
            })  
  })
}
