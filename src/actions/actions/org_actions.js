/*
this file will contain actions for UI components to emit
*/
import dispatcher from '../../data/Dispatcher'
import OrgActionTypes from '../types/OrgActionTypes'

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

//return t/f on successful log out
export function logOut(){
  dispatcher.dispatch({
    type: OrgActionTypes.LOG_OUT
  })
}

//display about page
export function displayAbout(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: OrgActionTypes.DISPLAY_ABOUT
  })
}

//display contact page
export function displayContact(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: OrgActionTypes.DISPLAY_CONTACT
  })
}

//display contact page
export function createVolop(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: OrgActionTypes.CREATE_VOLOP
  })
}
//display contact page
export function deleteVolop(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: OrgActionTypes.DELETE_VOLOP
  })
}
//display contact page
export function updateVolop(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: OrgActionTypes.UPDATE_VOLOP
  })
}
//display contact page
export function viewVolopOrg(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: OrgActionTypes.VIEW_VOLOP_ORG
  })
}
//display contact page
export function msgVolunteer(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: OrgActionTypes.MSG_VOLUNTEER
  })
}
//display contact page
export function viewOrgInfo(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: OrgActionTypes.VIEW_ORG_INFO
  })
}
//display contact page
export function editOrgInfo(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: OrgActionTypes.EDIT_ORG_INFO
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
  createVolop,
  deleteVolop,
  updateVolop,
  viewVolopOrg,
  msgVolunteer,
  VIEW_ORG_INFO,
  editOrgInfo
}
*/
