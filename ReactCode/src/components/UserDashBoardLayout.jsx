import React from 'react'
import UserStore from '../data/stores/UserStore'
import VolOpSearch from './VolOpSearch'
import EditUser from './EditUser'
import { Icon } from 'react-materialize'

export default class UserDashBoardLayout extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      user: JSON.parse(localStorage.getItem('userInfo')),
      view: 'saved'
    }

    this.handleClick = this.handleClick.bind(this)
    this.populateSavedVolops = this.populateSavedVolops.bind(this)
    this.populateWindowView = this.populateWindowView.bind(this)
    this.removeSavedVolOp = this.removeSavedVolOp.bind(this)
  }

  handleClick(type){
    this.setState({view:type})
  }

  populateSavedVolops(){
    let savedVolOps = this.state.user.savedVolOps
    return(
      <div id='user-saved-volops'>
        <a id='user-switch-volop-view' onClick={()=>this.handleClick('volop-search')}>Find new volunteer opportunities</a>
        <div id='user-saved-volop-list'>
        {savedVolOps.length ? savedVolOps.map(id => {
          return(
            <div id='user-volop'>
              <div id='user-remove-volop'>
                <Icon>delete</Icon>
              </div>
              <div id='user-volop-description'>
                {id}
              </div>
            </div>
          )
        }) :
            <h5>no volops saved yet</h5>}
        </div>
      </div>
    )
  }
  populateWindowView(){
    switch(this.state.view){
      case 'saved':
        return(this.populateSavedVolops())
        break
      case 'volop-search':
        return(
          <div>
            <a id='user-switch-saved-view' onClick={()=>this.handleClick('saved')}>View saved volunteer opportunities</a>
            <VolOpSearch userType='user' {...this.props}/>
          </div>
        )
        break
      case 'edit':
        return(
          <div id='edit-user-container'>
            <a id='user-back' onClick={()=>this.handleClick('saved')}>Back</a>
            <EditUser {...this.state.user}/>
          </div>
        )
    }
  }

  removeSavedVolOp(id){

  }


  render(){
    return(
      <div id='dashboard-user'>
        <div id='user-details'>
          <div id='user-img'>
            <Icon>account_circle</Icon>
          </div>
          <div id='user-edit'>
            <a onClick={()=>this.handleClick('edit')}>Edit Details</a>
          </div>
          <div id='user-header'>
            Welcome back, {this.state.user.firstName}!
          </div>
        </div>
        <div id='user-feed'>
        </div>
        <div id='user-volop-container'>
          {this.populateWindowView()}
        </div>
      </div>
    )
  }
}
