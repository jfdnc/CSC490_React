import dispatcher from '../Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'
import OrgActionTypes from '../../action_types/OrgActionTypes'

class OrgStore extends EventEmitter {
    constructor() {
        super()

        this.state = {org: {}, volOp: {} }
    }

    getAll(){
        return this.state
    }

    createVolOp(volOp){
        this.state.volOp = volOp
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
        console.log(org)
        this.state.org = org
        this.emit("change")
    }

    logout(){
        this.state.org = {}
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
