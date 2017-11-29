import React from 'react'
import { Button } from 'react-materialize'
import { Preloader } from 'react-materialize'
import OrgStore from '../data/stores/OrgStore'
import { getAllVolOpsByOrg } from '../actions/org_actions'
import VolOpListingOrg from './VolOpListingOrg'
import EditVolOp from './EditVolOp'
import NewVolOp from './NewVolOp'
import EditOrg from './EditOrg'

export default class OrgDashBoardLayout extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      volops: [],
      editvolop: {},
      view: 'browse'
    }

    this.populateWindow = this.populateWindow.bind(this)
    this.populateEditVolOp = this.populateEditVolOp.bind(this)
    this.changeView = this.changeView.bind(this)

  }

  componentWillMount(){
    OrgStore.on('change', () => {
      setTimeout(() => {
        this.setState({volops: OrgStore.getAll().allVolOps})
      }, 1200)
    })
    getAllVolOpsByOrg(this.props.orgVolOps)
  }

  populateWindow(){
      switch(this.state.view){
          case 'browse':
              let loadingmsg = (this.state.volops.length || OrgStore.getAll().org.length) ? "" : <Preloader size='big'/>
              return(
                  <div>
                  <h5>{loadingmsg}</h5>
                  {this.state.volops.map(volop => {
                      return(<VolOpListingOrg {...volop} changeView={this.changeView} populateEditVolOp={this.populateEditVolOp}/>)
                  })}
                  </div>
              )
              break
          case 'edit':
              return(
                  <div id='edit-user-container'>
                      <EditVolOp {...this.state.editvolop} changeView={this.changeView}/>
                  </div>
              )
              break
          case 'new':
              return(
                  <div id='edit-user-container'>
                      <NewVolOp changeView={this.changeView}/>
                  </div>
              )
              break
          case 'profile':
              return(
                  <div id='edit-user-container'>
                      <EditOrg {...JSON.parse(localStorage.getItem('orgInfo'))} changeView={this.changeView}/>
                  </div>
              )
              break
      }
  }

  populateEditVolOp(){
      this.setState({editvolop: JSON.parse(localStorage.getItem('volOpInfo'))})
  }

  changeView(type){
      this.setState({view: type})
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
          <a onClick={() => this.changeView('profile')}>Edit Profile</a>
        </div>
        <div id='org-newvolop'>
          <Button onClick={() => this.changeView('new')}>New Volunteer Opportunity</Button>
        </div>
          <div id='org-volopfeed'>
              {this.populateWindow()}
          </div>
      </div>
    )
  }
}
