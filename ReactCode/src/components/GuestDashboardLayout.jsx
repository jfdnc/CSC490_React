import React from 'react'
import { Button } from 'react-materialize'
import { Link } from 'react-router-dom'
import VolOpSearch from './VolOpSearch'

export default class GuestDashboardLayout extends React.Component{
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div className='dashboard-layout' id='dashboard-guest'>
        <div className='dashboard-side-content'>
          <div id='guest-side-content-header'>
            We want to help you connect to volunteer opportunies in your community! Sign up or sign in below, or search for local volunteer opportunities near you!
            <div id='reg-log-links'>
              <Link to='/register'><Button>Sign Up</Button></Link>
              <Link to='/login'><Button>Log In</Button></Link>
            </div>
          </div>

        </div>
        <div className='dashboard-main-content'>
          <div id='dashboard-guest-main-content-content'>
            <div id='content-header'>
              Find Local Volunteer Opportunities
            </div>
            <div id='content-search'>
              <VolOpSearch userType='guest'/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
