import dispatcher from './Dispatcher'
import { EventEmitter } from 'events'

class TestStore extends EventEmitter {
  constructor(props){
    super(props)

    this.testInfo = [
      {
        title: 'test_one'
      },
      {
        title: 'test_two'
      }
    ]
  }

  addNewInfo(title){
    this.testInfo.push({
      title
    })
    this.emit("change")
  }
  getAll(){
    return this.testInfo
  }

  handleActions(action){
    switch(action.type){
      case 'TEST_ACTION': {
        this.addNewInfo(action.text)
      }
    }
  }
}

const testStore = new TestStore
dispatcher.register(testStore.handleActions.bind(testStore))
export default testStore
