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
            twitterURL: "/auth/twitter",
            volOps:[],

        }
    }

    getAll(){
        return this.state
    }

    getvolOps(){
        return this.state.volOps
    }

    update(){
      let savedUserState = localStorage.getItem('VolOps') || false
      if(savedUserState){      
        this.state.volOps= JSON.parse(savedUserState)      
    }
      for(var i =0;i<this.state.volOps.length;i++){
        console.log(JSON.stringify(this.state.volOps[i])+" in for user store update")
       }

       this.emit("change")
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
        this.state.volOps = []
        this.emit("change")
    }

    initFBUser(user){//, volOps){
       this.state.user = user
       //this.state.volOps = volOps 
       //console.log(this.state.volOps)     
       this.emit("change")
    }

     initUser(user){
       this.state.user = user
       this.emit("change")
    }
/*
    initVolOps(volOps){
       this.state.user.savedVolOps = volOps             
       this.emit("change")
    }
    */

    initVolOps(volOp){
       this.state.volOps.push(volOp) 
       //let unique2 = [...new Set(this.state.volOps)] 
       //this.state.volOps=  unique2 
       console.log(JSON.stringify(volOp)+" volOp")
       console.log(this.state.volOps.toString()+" state.volOps")
       console.log(this.state.volOps+" state.volOps no to string")
       console.debug(this.state.volOps+"debug")
       for(var i =0;i<this.state.volOps.length;i++){
        console.log(JSON.stringify(this.state.volOps[i])+" in for user store")
       }
       localStorage.setItem('VolOps', JSON.stringify(this.state.volOps))
       this.emit("change") 
    }

     addVolOp(volOpID, volOp){     
       var size = this.state.user.savedVolOps.length 
       this.state.user.savedVolOps.push(volOpID) 
       let unique = [...new Set(this.state.user.savedVolOps)] 
       this.state.user.savedVolOps=  unique        
       
       if(size+1==this.state.user.savedVolOps.length ){
       this.state.volOps.push(volOp) 
       //let unique2 = [...new Set(this.state.volOps)] 
       //this.state.volOps=  unique2 
       }
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
            this.initFBUser(action.user)//,action.volOps);
            break
        case UserActionTypes.POPULATE_FROM_LOCAL_STORAGE:
            this.populateFromLocalStorage(action.user)
            break
        case UserActionTypes.EDIT_PREFS:
            this.initUser(action.user);
            break
        case UserActionTypes.SAVE_VOLOP:
            this.addVolOp(action.volOpID,action.volOps);
            break
        case UserActionTypes.INIT_VOLOPS:
        console.log(JSON.stringify(action.volOp)+' in switch')
            this.initVolOps(action.volOp);
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
