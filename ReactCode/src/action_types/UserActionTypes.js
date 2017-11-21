/*
this file will contain all valid action types
that can be sent from view components
*/

const UserActionTypes = {
  //Log actions
  LOG_OUT: 'LOG_OUT',
  //user unique actions
  VIEW_VOLOP_USER: 'VIEW_VOLOP_USER',
  SAVE_VOLOP: 'SAVE_VOLOP',
  INIT_VOLOPS: 'INIT_VOLOPS',
  SHARE_VOLOP: 'SHARE_VOLOP',
  EDIT_PREFS: 'EDIT_PREFS',
  CREATE_USER: 'CREATE_USER',
  LOGIN_USER: 'LOGIN_USER',
  INIT_FBUSER: 'INIT_FBUSER',
  ADD_CAL: 'ADD_CAL',
  DEL_VOL: 'DEL_VOL',
  POPULATE_FROM_LOCAL_STORAGE: 'POPULATE_FROM_LOCAL_STORAGE'
}

export default UserActionTypes
