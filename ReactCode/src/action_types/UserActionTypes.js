/*
this file will contain all valid action types
that can be sent from view components
*/

const UserActionTypes = {
  //Log actions
  GET_LOG_STATE: 'GET_LOG_STATE',
  GET_USER_TYPE: 'GET_USER_TYPE',
  LOG_OUT: 'LOG_OUT',
  //user unique actions
  VIEW_VOLOP_USER: 'VIEW_VOLOP_USER',
  SAVE_VOLOP: 'SAVE_VOLOP',
  SHARE_VOLOP: 'SHARE_VOLOP',
  EDIT_PREFS: 'EDIT_PREFS',
  CREATE_USER: 'CREATE_USER',
  LOGIN_USER: 'LOGIN_USER',
  INIT_FBUSER: 'INIT_FBUSER',
  ADD_CAL: 'ADD_CAL',
  POPULATE_FROM_LOCAL_STORAGE: 'POPULATE_FROM_LOCAL_STORAGE'
}

export default UserActionTypes
