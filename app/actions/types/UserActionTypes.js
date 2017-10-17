/*
this file will contain all valid action types
that can be sent from view components
*/

const UserActionTypes = {
  //Log actions
  GET_LOG_STATE: 'GET_LOG_STATE',
  GET_USER_TYPE: 'GET_USER_TYPE',
  LOG_OUT: 'LOG_OUT',
  //display actions
  DISPLAY_ABOUT: 'DISPLAY_ABOUT',
  DISPLAY_CONTACT: 'DISPLAY_CONTACT',
  //user unique actions
  VIEW_VOLOP_USER: 'VIEW_VOLOP_USER',
  SAVE_VOLOP: 'SAVE_VOLOP',
  SHARE_VOLOP: 'SHARE_VOLOP',
  EDIT_PREFS: 'EDIT_PREFS',
}

export default UserActionTypes
