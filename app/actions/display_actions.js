import dispatcher from '../data/Dispatcher'
import DisplayActionTypes from '../action_types/DisplayActionTypes'

export function displayHome(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: DisplayActionTypes.DISPLAY_HOME,
  })
}

export function displayRegister(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: DisplayActionTypes.DISPLAY_REGISTER
  })
}
//display login page
export function displayLogin(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: DisplayActionTypes.DISPLAY_LOGIN
  })
}
export function displayAbout(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: DisplayActionTypes.DISPLAY_ABOUT
  })
}
export function displayContact(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: DisplayActionTypes.DISPLAY_CONTACT
  })
}
export function updateDisplayUserType(newUserType){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: DisplayActionTypes.UPDATE_DISPLAY_USER_TYPE,
    newUserType: newUserType
  })
}

/* to export all functions
export default {
  displayHome,
  displayRegister,
  displayLogin,
  displayRegister,
  displayAbout,
  displayContact,
}
*/
