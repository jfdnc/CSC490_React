import dispatcher from '../Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'
import OrgActionTypes from '../../action_types/OrgActionTypes'

class OrgStore extends EventEmitter {
    constructor() {
        super()

        this.state = {org: {}, volOp: {}, allVolOps: [] }
    }

    getAll(){
        return this.state
    }

    populateFromLocalStorage(savedOrgState){
      this.state.org = savedOrgState
      this.emit("change")
    }

    createVolOp(volOp){
        this.state.volOp = volOp
        this.state.allVolOps.unshift(volOp)
        this.emit("change")
    }

    deleteVolOp(){
        this.state.volOp = {}
        this.emit("change")
    }

    updateVolOp(volOp){
        this.state.volOp = volOp
        this.emit("change")
    }

    viewVolOpOrg(volOp){

    }

    viewOrgInfo(org){

    }

    editOrgInfo(org){
        this.state.org = org
        this.emit("change")
    }

    loginOrg(org){
        this.state.org = org
        this.emit("change")
    }

    logout(){
        this.state.org = {}
        this.emit("change")
    }

    getAllVolOpsByOrg(allVolOps){
      this.state.allVolOps = allVolOps
      this.emit("change")
    }

    getVolOpById(volOp){
        this.state.volOp = volOp
        this.emit("change")
    }


    handleActions(action) {
        switch (action.type) {
            case OrgActionTypes.CREATE_VOLOP:
                this.createVolOp(action.volOp);
                break
            case OrgActionTypes.DELETE_VOLOP:
                this.deleteVolOp();
                break
            case OrgActionTypes.UPDATE_VOLOP:
                this.updateVolOp(action.volOp);
                break
            case OrgActionTypes.VIEW_VOLOP_ORG:
                this.viewVolOpOrg(action.volOp);
                break
            case OrgActionTypes.VIEW_ORG_INFO:
                this.viewOrgInfo(action.org);
                break
            case OrgActionTypes.EDIT_ORG_INFO:
                this.editOrgInfo(action.org);
                break
            case OrgActionTypes.LOG_OUT:
                this.logout();
                break
            case OrgActionTypes.LOGIN_ORG:
                this.loginOrg(action.org);
                break
            case OrgActionTypes.GET_ALL_VOLOPS_BY_ORG:
                this.getAllVolOpsByOrg(action.allVolOps);
                break
            case OrgActionTypes.GET_VOLOP_BY_ID:
                this.getVolOpById(action.volOp);
            case OrgActionTypes.POPULATE_FROM_LOCAL_STORAGE:
                this.populateFromLocalStorage(action.org)
                break
        }
    }
}

/*
create new instance of this store type to export
files importing TestStore get this new instance of TestStore
*/
const orgStore = new OrgStore
//register dispatcher to this store to handle action passing
dispatcher.register(orgStore.handleActions.bind(orgStore))
export default orgStore
