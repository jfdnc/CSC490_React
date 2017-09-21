import dispatcher from '../data/Dispatcher'
import ActionTypes from './ActionTypes'

export function testAction(text){
  dispatcher.dispatch({
    type: ActionTypes.TEST_ACTION,
    text
  })
}
