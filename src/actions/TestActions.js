/*
this file will contain actions for UI components to emit
*/
import dispatcher from '../data/Dispatcher'
import ActionTypes from './ActionTypes'

export function testAction(text){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: ActionTypes.TEST_ACTION,
    text
  })
}

export function changeName(text){
	console.log("changeName: text="+text)
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: ActionTypes.NEW_NAME,
    text: text
  })
}
