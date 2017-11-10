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
          <Link to='/register'><Button>Sign Up</Button></Link>
          <Link to='/login'><Button>Log In</Button></Link>
        </div>
        <div class='dashboard-main-content'>
          <div id='dashboard-guest-main-content-header'>
            <h5>Find Local Volunteer Opportunities</h5>
          </div>
          <div id='dashboard-guest-main-content-content'>
            Select the categories that you are passionate about, enter your location, and search for volunteer opportunies near you!
            <hr/>
            NVM
          </div>
        </div>
      </div>
    )
  }
}
