import React from 'react'
import UserStore from '../data/stores/OrgStore'

export default class UserDashBoardLayout extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){//comment out to test with testvolops

  }


  render(){
    return(
      <div id='dashboard-user'>
        <div id="user-info">
        <div id="user-name">{this.props.orgName}</div>
        <div id="user-email">{this.props.orgEmail}</div>
        <div id="org-phone">{this.props.orgPhone}</div>
        <div id="org-contactperson">{this.props.orgContactPerson}</div>
        <div id="org-website">{this.props.orgWebsite}</div>
        <div id="org-address">
          {this.props.orgAddress.street}, {this.props.orgAddress.city}, {this.props.orgAddress.state}, {this.props.orgAddress.zip}
        </div>
        </div>
        <div id='org-editorg'>
          <Link to='/editorg'><a>Edit Profile</a></Link>
        </div>
        <div id='org-newvolop'>
          <Link to='/newvolop'><Button>New Volunteer Opportunity</Button></Link>
        </div>
        <div id='org-volopfeed'>
          <h5>{loadingmsg}</h5>
          {this.state.volops.map(volop => {
            return(<VolOpListingOrg {...volop}/>)
          })}
        </div>
      </div>
    )
  }
}
