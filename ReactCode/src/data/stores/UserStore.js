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

      let savedVolOpState = localStorage.getItem('VolOps') || false
      if(savedVolOpState){      
        this.state.volOps= JSON.parse(savedVolOpState) 
        this.emit("change")  
    }
      
    }

    getAll(){
        return this.state
    }

    populateFromLocalStorage(savedUserState){
      this.state.user = savedUserState
      //this.state.volOps = []
      
      for(var i=0;i<this.state.user.savedVolOps.length;i++){
         this.addVolOpAgain(this.state.user.savedVolOps[i])
       }
      this.emit("change")
    }

    createUser(user){
        //this.state.user = user
        this.emit("change")
    }

    loginUser(user){
        this.state.user = user
        //this.state.volOps = []
       
        for(var i=0;i<this.state.user.savedVolOps.length;i++){
          
         this.addVolOpAgain(this.state.user.savedVolOps[i])
       }

        this.emit("change")
    }

    logOut(){
        this.state.user = {}
        this.state.volOps = []
        this.emit("change")
    }

    initFBUser(user){
     
       this.state.user = user
       //this.state.volOps = []
       for(var i=0;i<this.state.user.savedVolOps.length;i++){
         this.addVolOpAgain(this.state.user.savedVolOps[i])
       }
       this.emit("change")

    }

     initUser(user){
     
       this.state.user = user
       //this.state.volOps = []
       for(var i=0;i<this.state.user.savedVolOps.length;i++){
         this.addVolOpAgain(this.state.user.savedVolOps[i])
       }
       this.emit("change")
    }

    initVolOps(volOps){
      //this.state.volOps = []
      this.state.user.savedVolOps = volOps
      for(var i=0;i<this.state.user.savedVolOps.length;i++){
       this.addVolOpAgain(this.state.user.savedVolOps[i])
     }
     this.emit("change")
   }

    addVolOpAgain(volOpID){

      var duplicate = false
          this.state.volOps.map((volOp)=>{

            if(volOp._id==volOpID){
              duplicate=true
            }
          })

          if(!duplicate){
      fetch('/api/volOps/'+volOpID)
        .then((resp) => resp.json()) // Transform the data into json
        .then((data2) => { 

          this.state.volOps.push(data2) 
          localStorage.setItem('VolOps', JSON.stringify(this.state.volOps))  
          this.emit("change")  
          return data2
        })
      }

    }

     addVolOp(volOpID){
      var size = this.state.user.savedVolOps.length 
       this.state.user.savedVolOps.push(volOpID)
       let unique = [...new Set(this.state.user.savedVolOps)]
       this.state.user.savedVolOps=  unique     
      
       if(size+1==this.state.user.savedVolOps.length ){
         fetch('/api/volOps/'+volOpID)
        .then((resp) => resp.json()) // Transform the data into json
        .then((data2) => { 
          this.state.volOps.push(data2) 
          localStorage.setItem('VolOps', JSON.stringify(this.state.volOps))  
          this.emit("change")  
          return data2
        })
       
       
       //let unique2 = [...new Set(this.state.volOps)] 
       //this.state.volOps=  unique2 
       }
       this.emit("change") 
    }

    delVolOps(volOpID){

      //this.state.volOps = this.state.volOps.filter(( obj ) =>{
      //  return obj._id != volOpID;
     // });

     for (var i = this.state.volOps.length - 1; i >= 0; --i) {
      if (this.state.volOps[i]._id == volOpID) {
        this.state.volOps.splice(i,1);
      }
    }
    
      if(this.state.volOps.legnth==0){
        localStorage.removeItem('VolOps')
      }else{
      localStorage.setItem('VolOps', JSON.stringify(this.state.volOps)) 
      } 

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
        case UserActionTypes.DEL_VOL:
            this.delVolOps(action.volOpID);
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
