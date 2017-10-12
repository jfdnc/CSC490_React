/*
this file will contain actions for UI components to emit
*/
import dispatcher from '../data/Dispatcher'
import GuestActionTypes from '../types/GuestActionTypes'

export function displayRegister(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: GuestActionTypes.DISPLAY_REGISTER
  })
}
//display login page
export function displayLogin(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: GuestActionTypes.DISPLAY_LOGIN
  })
}
export function displayAbout(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: GuestActionTypes.DISPLAY_ABOUT
  })
}
export function displayContact(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: GuestActionTypes.DISPLAY_CONTACT
  })
}

/* to export all functions
export default {
  displayLogin,
  displayRegister,
  displayAbout,
  displayContact
}
*/
