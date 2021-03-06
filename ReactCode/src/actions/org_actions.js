import dispatcher from '../data/Dispatcher'
import OrgActionTypes from '../action_types/OrgActionTypes'

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
    return new Promise((resolve, reject) =>{
        let myReq = new Request('/api/volOps/' + id, {method:'DELETE'})
        fetch(myReq)
            .then(function(res){
                resolve(res.json())
            })
            .catch(function(err){
                console.log(err)
            })

        dispatcher.dispatch({
            type: OrgActionTypes.DELETE_VOLOP
    })
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
                resolve(res.json())
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
      console.log("Creating org")
        console.log(org)
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

//login organization
export function loginOrg(org){
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

//logout organization
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

export function populateFromLocalStorage(){
  return new Promise((resolve, reject) => {
    let savedOrgState = localStorage.getItem('orgInfo') || false
    if(savedOrgState){
      dispatcher.dispatch({
        type: OrgActionTypes.POPULATE_FROM_LOCAL_STORAGE,
        org: savedOrgState
      })
    }
  })
}
