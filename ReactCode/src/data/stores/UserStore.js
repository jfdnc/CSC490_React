//for receiving actions via dispatcher
import dispatcher from '../Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'
import UserActionTypes from '../../action_types/UserActionTypes'

class UserStore extends EventEmitter {
constructor(props) {
        super(props)

        this.state = {
            user: {},
            facebookURL: "/auth/facebookLogin",
            twitterURL: "/auth/twitter"
        }
    }

    getAll(){
        return this.state
    }

    populateFromLocalStorage(savedUserState){
      this.state.user = savedUserState
      this.emit("change")
    }

    createUser(user){
        //this.state.user = user
        this.emit("change")
    }

    loginUser(user){
        this.state.user = user
        this.emit("change")
    }

    logOut(){
        this.state.user = {}
        this.emit("change")
    }

    initFBUser(user){
       this.state.user = user      
       this.emit("change")
    }

     initUser(user){
       this.state.user = user
       this.emit("change")
    }

    initVolOps(volOps){
       this.state.user.savedVolOps = volOps             
       this.emit("change")
    }

     addVolOp(volOpID){     
        
       this.state.user.savedVolOps.push(volOpID) 
       let unique = [...new Set(this.state.user.savedVolOps)] 
       this.state.user.savedVolOps=  unique        
       this.emit("change")

    }

    
    handleActions(action) {
      switch (action.type) {
        case UserActionTypes.CREATE_USER:
            this.createUser(action.user);
            break
        case UserActionTypes.LOGIN_USER:
            this.loginUser(action.user);
            break
        case UserActionTypes.LOG_OUT:
            this.logOut();
            break
        case UserActionTypes.INIT_FBUSER:
            this.initFBUser(action.user);
            break
        case UserActionTypes.POPULATE_FROM_LOCAL_STORAGE:
            this.populateFromLocalStorage(action.user)
            break
        case UserActionTypes.EDIT_PREFS:
            this.initUser(action.user);
            break
        case UserActionTypes.SAVE_VOLOP:
            this.addVolOp(action.volOpID);
            break
        case UserActionTypes.INIT_VOLOPS:
            this.initVolOps(action.volOps);
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
