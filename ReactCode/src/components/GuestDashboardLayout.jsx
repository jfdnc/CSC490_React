import React from 'react'
import { Button } from 'react-materialize'
import { Link } from 'react-router-dom'
export default class GuestDashboardLayout extends React.Component{
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div class='dashboard-layout' id='dashboard-guest'>
        <div class='dashboard-side-content'>
          <div id='guest-side-content-header'>
            We want to help you connect to volunteer opportunies in your community! Sign up or sign in below, or search for local volunteer opportunities near you!
            <div id='reg-log-links'>
              <Link to='/register'><Button>Sign Up</Button></Link>
              <Link to='/login'><Button>Log In</Button></Link>
            </div>
          </div>

        </div>
        <div class='dashboard-main-content'>
          <div id='dashboard-guest-main-content-content'>
            <h5>Find Local Volunteer Opportunities</h5>
            <hr/>
            **SEARCH COMPONENT HERE**
          </div>
        </div>
      </div>
    )
  }
}
