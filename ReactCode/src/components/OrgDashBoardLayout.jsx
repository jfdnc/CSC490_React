import React from 'react'
import { Button } from 'react-materialize'
import { Link } from 'react-router-dom'
import VolOpSearch from './VolOpSearch'
import EditOrg from './EditOrg'
import OrgStore from '../data/stores/OrgStore'
import { getAllVolOpsByOrg } from '../actions/org_actions'

export default class OrgDashBoardLayout extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      volops: []
    }

  }

  componentWillMount(){
    OrgStore.on('change', () => {
      this.setState({volops: OrgStore.getAll().allVolOps})
    })
    getAllVolOpsByOrg(this.props.orgVolOps)
  }

  render(){
    return(
      <div id='dashboard-org'>
        <div id="org-info">
        <div id="org-name">{this.props.orgName}</div>
        <div id="org-email">{this.props.orgEmail}</div>
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
          {this.state.volops.map(volop => {
            return(<h6>{volop._id}</h6>)
          })}
        </div>
      </div>
    )
  }
}
