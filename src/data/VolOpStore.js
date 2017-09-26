/*
example store to illustrate receiving dispatcher action and emitting change
to UI components lisening for store emissions
*/

//for receiving actions via dispatcher
import dispatcher from './Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'

//const express = require('express')
//const mongoose = require('mongoose')
//const app = express()


class VolOpStore extends EventEmitter {

//var db = mongoose.connect('mongodb://admin:csc490@108.234.184.90/admin')
  
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

    this.name = "Smith"
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

  getName(){
    return this.name
  }

  setName(newName){
    console.log("setName"+newName)
    this.name = newName
    this.emit("change")
  }

  /*
  switch on action type to determine what to do with action from dispatcher
  this is where we would call functions to interact with DB, GoogleMaps,
  FaceBook, etc if needed
  */
  handleActions(action){
    console.log("handleActions: type="+action.type+" text="+action.text)
    switch(action.type){
      case 'TEST_ACTION': {
        this.addNewInfo(action.text)
      } break
      case 'NEW_NAME':{
        this.setName(action.text)
      }
    }
  }
}

/*
create new instance of this store type to export
files importing TestStore get this new instance of TestStore
*/
const volOpStore = new VolOpStore
//register dispatcher to this store to handle action passing
dispatcher.register(volOpStore.handleActions.bind(volOpStore))
export default volOpStore
