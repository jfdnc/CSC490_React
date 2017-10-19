/*
this file will contain all valid action types
that can be sent from view components
*/

const OrgActionTypes = {
  //Log actions
  GET_LOG_STATE: 'GET_LOG_STATE',
  GET_USER_TYPE: 'GET_USER_TYPE',
  LOG_OUT: 'LOG_OUT',
  //org unique actions
  CREATE_VOLOP: 'CREATE_VOLOP',
  DELETE_VOLOP: 'DELETE_VOLOP',
  UPDATE_VOLOP: 'UPDATE_VOLOP',
  VIEW_VOLOP_ORG: 'VIEW_VOLOP_ORG',
  MSG_VOLUNTEER: 'MSG_VOLUNTEER',
  VIEW_ORG_INFO: 'VIEW_ORG_INFO',
  EDIT_ORG_INFO: 'EDIT_ORG_INFO'
}

export default OrgActionTypes
