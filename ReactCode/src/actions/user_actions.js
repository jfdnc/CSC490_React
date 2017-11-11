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
export function saveVolop(userID, volOpID){

 return new Promise((resolve, reject) => {
  var bundle = {
    userId: userID,
    volOpId: volOpID
  }

  let myReq = new Request('/api/userVol', {method:'PUT', body: JSON.stringify(bundle),
    headers: {'Accept': 'application/json',"Content-Type": "application/json"}})
  fetch(myReq)
  .then(function(res){
    //console.log(res)
  })
  .catch(function(err){
    console.log(err)
  })

  dispatcher.dispatch({
    type: UserActionTypes.SAVE_VOLOP,
    volOpID: volOpID
  })
})

}

export function shareVolop(){
  dispatcher.dispatch({
    type: UserActionTypes.SHARE_VOLOP
  })
}

export function editPrefs(user){
  return new Promise((resolve, reject) => {
    let myReq = new Request('/api/users/'+user._id, {method:'PUT', body: JSON.stringify(user),
      headers: {"Content-Type": "application/json"}})
    fetch(myReq)
    .then(function(res){
            //console.log(res)            
          })
    .catch(function(err){
      console.log(err)
    })

    dispatcher.dispatch({
      type: UserActionTypes.EDIT_PREFS,
      user: user
    })
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

/**
user._id needs to be defined.  This is the Mongo id of the user
*/
export function editUser(user){
  return new Promise((resolve, reject) => {
    let myReq = new Request('/api/users/'+user._id, {method:'PUT', body: JSON.stringify(user),
      headers: {"Content-Type": "application/json"}})
    fetch(myReq)
    .then(function(res){
            //console.log(res)
          })
    .catch(function(err){
      console.log(err)
    })

    dispatcher.dispatch({
      type: UserActionTypes.EDIT_PREFS,
      user: user
    })

  })
}


export function initFBState(token,user){
  
  return new Promise((resolve, reject) => {


    fetch('/api/users/'+user.email)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
      //data._id = user._id
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(data))



    //send to dispatcher
    dispatcher.dispatch({
      type: UserActionTypes.INIT_FBUSER,
      user: data
    })
  })
})               
saveVolop('5a06872b3a5af5342c3e0d0f','5a0685a6a4a20024b40cf80d')
}


/**
this method relies on local storage to work
*/
export function initVolOps(userEmail){
  return new Promise((resolve, reject) => {
   fetch('/api/users/'+userEmail)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    //console.log(data.savedVolOps.toString())
    dispatcher.dispatch({
      type: UserActionTypes.INIT_VOLOPS,
      volOps: data.savedVolOps
    })
  })
}) 
}

export function populateFromLocalStorage(){
  return new Promise((resolve, reject) => {
    let savedUserState = localStorage.getItem('userInfo') || false
    if(savedUserState){
      dispatcher.dispatch({
        type: UserActionTypes.POPULATE_FROM_LOCAL_STORAGE,
        user: JSON.parse(savedUserState)
      })
    }
  })
}
