import React from 'react'
import UserStore from '../data/stores/UserStore'
import VolOpSearch from './VolOpSearch'
import EditUser from './EditUser'
import { Icon } from 'react-materialize'

export default class UserDashBoardLayout extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      user: this.props.userState,
      view: 'saved'
    }

    this.handleClick = this.handleClick.bind(this)
    this.populateSavedVolops = this.populateSavedVolops.bind(this)
  }

  handleClick(type){
    this.setState({view:type})
  }

  populateSavedVolops(){
    return(
      <h1>list of saved volops</h1>
    )
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
          {this.state.view === 'saved' ? this.populateSavedVolops() :
                               'edit'  ? <EditUser {...this.state.user}/> :
          <VolOpSearch userType='guest' {...this.props}/>}
        </div>
      </div>
    )
  }
}
