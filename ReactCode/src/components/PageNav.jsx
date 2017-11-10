import React from 'react'
import { Navbar, NavItem, SideNav, SideNavItem } from 'react-materialize'
import { NavLink, Route } from 'react-router-dom'
import { logOut as userLogOut } from '../actions/user_actions'
import { logOut as orgLogOut } from '../actions/org_actions'
import UserStore from '../data/stores/UserStore'
import OrgStore from '../data/stores/OrgStore'
import _ from 'lodash'

import MainView from './MainView'


let guestNavTypes = [
  {
    navUrl: '/register',
    navText: 'Register'
  },{
    navUrl: '/login',
    navText: 'Log In'
  },{
    navText: 'About'
  },{
    navText: 'Contact'
  },
]
let userNavTypes = [
    {
      navText: 'Log Out'
    },{
      navText: 'About'
    },{
      navText: 'Contact'
    }
]
let orgNavTypes = [
    {
      navText: 'Log Out'
    },{
      navText: 'About'
    },{
      navText: 'Contact'
    }
]

export default class PageNav extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      userLoggedIn: false,
      orgLoggedIn: false
    }

    this.mapNavHeaders = this.mapNavHeaders.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
  }

  componentWillMount(){
    let token    = localStorage.getItem('token')    || false,
        userInfo = localStorage.getItem('userInfo')  || false,
        orgInfo  = localStorage.getItem('orgInfo') || false
    if(token){
      if(userInfo){
        this.setState({ userLoggedIn: true })
      } else if(orgInfo){
        this.setState({ orgLoggedIn: true })
      }
    }

    UserStore.on('change', () => {
      let loggedIn = !_.isEmpty(UserStore.getAll().user)
      this.setState({ userLoggedIn:loggedIn })
    })
    OrgStore.on('change', () => {
      let loggedIn = !_.isEmpty(OrgStore.getAll().org)
      this.setState({ orgLoggedIn:loggedIn })
    })
  }

  mapNavHeaders(headerList){
    //messy -- make this a switch statement and abstract sidenav out to
    //about and contact components
    return(
      headerList.map((headerItem, i) => {
        if(headerItem.navText == 'Log Out'){
          return(
            <li key={i}><a key={i} onClick={() => this.handleLogOut()}>{headerItem.navText}</a></li>
          )
        } else if(headerItem.navText == 'About' || headerItem.navText == 'Contact'){
          return(
            <SideNav
            	trigger={<li><a>{headerItem.navText}</a></li>}
            	options={{ closeOnClick: true, edge: 'right', menuWidth:'450px'}}
            	>
              <SideNavItem>{headerItem.navText}</SideNavItem>
            	<SideNavItem divider />
            	<SideNavItem subheader>Subheader</SideNavItem>
            </SideNav>
          )
        } else {
          return(
            <li key={i}><NavLink key={i} to={headerItem.navUrl}>{headerItem.navText}</NavLink></li>
          )
        }
      })
    )
  }

  handleLogOut(){
    if(this.state.userLoggedIn){
      userLogOut().then(this.props.history.push('/'))
    } else if(this.state.orgLoggedIn){
      orgLogOut().then(this.props.history.push('/'))
    }
  }

    render(){
      let currNavTypes = this.state.userLoggedIn ? userNavTypes :
                         this.state.orgLoggedIn  ? orgNavTypes  :
                         guestNavTypes
      return(
        <div>
        <div id='nav-bar-strip'/>
        <Navbar brand={<NavLink to='/'>eVol</NavLink>} id='page-nav' right>
          {
            this.mapNavHeaders(currNavTypes)
          }
        </Navbar>
        </div>
      )
    }
}
