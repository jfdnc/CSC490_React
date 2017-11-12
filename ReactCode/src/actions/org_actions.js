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
export function deleteVolOp(id){
  dispatcher.dispatch({
    type: OrgActionTypes.DELETE_VOLOP
  })
}

//update a volop in database
export function updateVolOp(volOp){
    return new Promise((resolve, reject) =>{
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
    })
}

//edit org info
export function editOrgInfo(org){
    return new Promise((resolve, reject) => {
        let myReq = new Request('/api/organizations/' + org._id, {method:'PUT', body: JSON.stringify(org),
            headers: {"Content-Type": "application/json"}})
        fetch(myReq)
            .then(function(res){
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
        .then(function(){
            let myReq1 = new Request('/emailRequest', {method: 'POST', body: JSON.stringify(org),
                headers: {'Content-Type': 'application/json'}})
            fetch(myReq1)
                .catch(function(err){
                    console.log(err)
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

export function getAllVolOpsByOrg(volOpIds){
    return new Promise((resolve, reject) =>{
        let volOpArr = []
        for(var i=0; i<volOpIds.length; i++){
            let myReq = new Request('/api/volOps/' + volOpIds[i], {method:'GET', headers: {"Content-Type": "application/json"}})
            fetch(myReq)
                .then(res => res.json())
                .then(resJSON => {
                    volOpArr.push(resJSON)
                })
                .catch(function(err){
                    console.log(err)
                })
        }
        dispatcher.dispatch({
            type: OrgActionTypes.GET_ALL_VOLOPS_BY_ORG,
            allVolOps: volOpArr
        })
    })
}

export function getVolOpById(id){
    return new Promise((resolve, reject) =>{
        let myReq = new Request('/api/volOps/' + id, {method: 'GET', headers: {'Content-Type': 'application/json'}})
        fetch(myReq)
            .then(res => res.json())
            .then(resJSON => {
                localStorage.setItem('volOpInfo', JSON.stringify(resJSON))
                dispatcher.dispatch({
                    type: OrgActionTypes.GET_VOLOP_BY_ID,
                    volOp: resJSON
                })
            })
            .catch(function(err){
                console.log(err)
            })
    })
}
