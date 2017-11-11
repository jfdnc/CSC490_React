import React from 'react'
import UserStore from '../data/stores/UserStore'
import OrgStore from '../data/stores/OrgStore'
import GuestView from './GuestView'
import UserView from './UserView'
import OrgView from './OrgView'
import _ from 'lodash'

export default class MainView extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      userState: localStorage.getItem('userInfo') || {},
      orgState: localStorage.getItem('orgInfo') || {}
    }
  }

  componentWillMount(){
    UserStore.on('change', () => {
      this.setState({ userState: UserStore.getAll().user })
    })
    OrgStore.on('change', () => {
      this.setState({ orgState: OrgStore.getAll().org })
    })
  }

  render(){
    /*
    let proparr   = [],
        userState = this.state.userState,
        orgState  = this.state.orgState
    //if userstate isn't empty, user is logged in
    if(!_.isEmpty(userState)){
      //find all top-level properties in the user object
      for(var property in userState){
        if(userState.hasOwnProperty(property)){
          proparr.push({ propName: property, propContent:userState[property] })
        }
      }
      //if org state isnt empty org is logged in
    } else if(!_.isEmpty(orgState)){
      for(var property in orgState){
        //find all top-level properties in the org object
        if(orgState.hasOwnProperty(property)){
          if(property !== 'orgAddress'){
            proparr.push({ propName: property, propContent: orgState[property] })
          } else {
            //address is nested, so go one level deeper and append those to proparr
            for(var addrProp in orgState[property]){
              if(orgState[property].hasOwnProperty(addrProp)){
                proparr.push({propName: addrProp, propContent: (orgState[property])[addrProp]})
              }
            }
          }
        }
      }
    }*/
    //at this point proparr contains all info for logged in user/org
    //just spitting it out for now, but we can use it for something!
    //likely we will just check if the objects are populated, and use
    //their properties by name... but whatever for right now.

    let userState = this.state.userState,
        orgState  = this.state.orgState

    let currView = !_.isEmpty(userState) ? <UserView /> :
                   !_.isEmpty(orgState)  ? <OrgView />  :
                   <GuestView />

    return(

      <div id='main-container'>
        <div id="content-container">
          {currView}
        </div>
      </div>
    )
  }
}
