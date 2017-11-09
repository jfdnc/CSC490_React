//for receiving actions via dispatcher
import dispatcher from '../Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'
import UserActionTypes from '../../action_types/UserActionTypes'

class UserStore extends EventEmitter {
    constructor(props) {
        super(props)
      
        this.state = { user: {} }
    }

    createUser(user){
        this.user = user
        this.emit("change")
    }

    initUser(){
       var url_string = window.location.href
       var url = new URL(url_string);
       var newUser = {
        firstName:  url.searchParams.get("firstName"),
        lastName: url.searchParams.get("lastName"),
        email: url.searchParams.get("email")
       }
       this.state.user = newUser

       console.log(this.state.user.email)
       this.emit("change")
    }

    handleActions(action) {
      switch (action.type) {
        case UserActionTypes.CREATE_USER:
            this.createUser(action.user);
            break
        case UserActionTypes.INIT_FBUSER:
            this.initUser();
            break
        }
    }
}

/*
create new instance of this store type to export
files importing TestStore get this new instance of TestStore
*/
const userStore = new UserStore
//register dispatcher to this store to handle action passing
dispatcher.register(userStore.handleActions.bind(userStore))
export default userStore
