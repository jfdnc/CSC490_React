/*
this file will contain actions for UI components to emit
*/
import dispatcher from '../data/Dispatcher'
import ActionTypes from './ActionTypes'

export function displayRegister(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: ActionTypes.DISPLAY_REGISTER
  })
}
//display login page
export function displayLogin(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: ActionTypes.DISPLAY_LOGIN
  })
}
export function displayAbout(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: ActionTypes.DISPLAY_ABOUT
  })
}
export function displayContact(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: ActionTypes.DISPLAY_CONTACT
  })
}

/*
export default {
  displayLogin,
  displayRegister,
  displayAbout,
  displayContact
}
*/
