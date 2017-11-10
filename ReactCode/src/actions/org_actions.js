/*
this file will contain actions for UI components to emit
*/
import dispatcher from '../data/Dispatcher'
import OrgActionTypes from '../action_types/OrgActionTypes'

//return t/f on loggedIn state
export function getLogState(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: OrgActionTypes.GET_LOG_STATE
  })
}

//return string on user type state (guest, user, org)
export function getUserType(){
  dispatcher.dispatch({
    type: OrgActionTypes.GET_USER_TYPE
  })
}

//Create a new volop in database
export function createVolop(volOp){
  return new Promise((resolve, reject) => {
    let myReq = new Request('/api/volOps', {method:'POST', body: JSON.stringify(volOp),
        headers: {"Content-Type": "application/json"}})
    fetch(myReq)
        .then(function(res){
            resolve(res.json())
        })
        .catch(function(err){
            console.log(err)
        })

    dispatcher.dispatch({
      type: OrgActionTypes.CREATE_VOLOP,
      volOp: volOp
    })
  })
}

//delete a volop from database
export function deleteVolop(){
  dispatcher.dispatch({
    type: OrgActionTypes.DELETE_VOLOP
  })
}

//update a volop in database
export function updateVolop(volOp){
    let myReq = new Request('/api/volOps/' + volOp._id, {method:'PUT', body: JSON.stringify(volOp),
        headers: {"Content-Type": "application/json"}})
    fetch(myReq)
        .then(function(res){
            console.log(res)
        })
        .catch(function(err){
            console.log(err)
        })

  dispatcher.dispatch({
    type: OrgActionTypes.UPDATE_VOLOP,
    volOp: volOp
  })
}
//view a volop
export function viewVolopOrg(){
  dispatcher.dispatch({
    type: OrgActionTypes.VIEW_VOLOP_ORG
  })
}
//message previous volunteers (probably removing)
export function msgVolunteer(){
  dispatcher.dispatch({
    type: OrgActionTypes.MSG_VOLUNTEER
  })
}
//view org info
export function viewOrgInfo(){
  dispatcher.dispatch({
    type: OrgActionTypes.VIEW_ORG_INFO
  })
}
//edit org info
export function editOrgInfo(org){
    return new Promise((resolve, reject) => {
        let myReq = new Request('/api/organizations/' + org._id, {method:'PUT', body: JSON.stringify(org),
            headers: {"Content-Type": "application/json"}})
        console.log("ORG")
        console.log(JSON.stringify(org))
        fetch(myReq)
            .then(function(res){
                console.log(res)
                localStorage.setItem('orgInfo', JSON.stringify(org))
            })
            .catch(function(err){
                console.log(err)
            })

        dispatcher.dispatch({
            type: OrgActionTypes.EDIT_ORG_INFO,
            org: org
        })
    })
}

//create an organization
export function createOrg(org){
  return new Promise((resolve, reject) => {
    let myReq = new Request('/api/orgrequests', {method:'POST', body: JSON.stringify(org),
        headers: {"Content-Type": "application/json"}})
    fetch(myReq)
        .then(function(res){
            console.log(res)
            let myReq1 = new Request('/emailRequest', {method: 'POST', body: JSON.stringify(org),
                headers: {'Content-Type': 'application/json'}})
            fetch(myReq1)
                .then(function(res1){
                    console.log(res1)
                })
                .catch(function(err1){
                    console.log(err1)
                })
        })
        .catch(function(err){
            console.log(err)
        })

    dispatcher.dispatch({
        type: OrgActionTypes.CREATE_ORG,
    })
  })
}

export function loginOrg(org){
  //make API call to login user
  //return promise to login in Login
  return new Promise((resolve,reject) =>{
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/loginorg');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            // success so save the token
            localStorage.setItem('token', xhr.response.token);
            localStorage.setItem('orgInfo', JSON.stringify(xhr.response.org))
            //send to dispatcher
            dispatcher.dispatch({
                type: OrgActionTypes.LOGIN_ORG,
                org: xhr.response.org
            })
        }
    });
    xhr.send(org)
  })
}

export function logOut(){
  return new Promise((resolve, reject) => {
    //remove the token from local storage
    localStorage.removeItem('token')
    localStorage.removeItem('orgInfo')
    dispatcher.dispatch({
        type: OrgActionTypes.LOG_OUT
    })
  })
}
