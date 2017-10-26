//for receiving actions via dispatcher
import dispatcher from '../Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'
import UserActionTypes from "../../actions/types/UserActionTypes";

class UserStore extends EventEmitter {
    constructor(props) {
        super(props)
    }

    createUser(user){
        console.log(user)
    }

    handleActions(action) {
      console.log(action);
      switch (action.type) {
        case 'CREATE_USER':
            this.createUser(action.user);
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
