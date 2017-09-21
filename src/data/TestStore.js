/*
example store to illustrate receiving dispatcher action and emitting change
to UI components lisening for store emissions
*/

//for receiving actions via dispatcher
import dispatcher from './Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'

class TestStore extends EventEmitter {
  constructor(props){
    super(props)

    //initial dummy data for testing
    this.testInfo = [
      {
        text: 'previously saved data'
      },
      {
        text: 'previously saved data'
      }
    ]
  }

  addNewInfo(text){
    this.testInfo.push({
      text
    })
    //automatically emits to UI components listening to changes in the store
    this.emit("change")
  }
  getAll(){
    return this.testInfo
  }

  /*
  switch on action type to determine what to do with action from dispatcher
  this is where we would call functions to interact with DB, GoogleMaps,
  FaceBook, etc if needed
  */
  handleActions(action){
    switch(action.type){
      case 'TEST_ACTION': {
        this.addNewInfo(action.text)
      }
    }
  }
}

/*
create new instance of this store type to export
files importing TestStore get this new instance of TestStore
*/
const testStore = new TestStore
//register dispatcher to this store to handle action passing
dispatcher.register(testStore.handleActions.bind(testStore))
export default testStore
