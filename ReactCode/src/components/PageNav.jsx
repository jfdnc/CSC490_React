import React from 'react'
import { Navbar, NavItem, SideNav, SideNavItem } from 'react-materialize'
import { NavLink, Route } from 'react-router-dom'
import { logOut as userLogOut } from '../actions/user_actions'
import { logOut as orgLogOut } from '../actions/org_actions'
import UserStore from '../data/stores/UserStore'
import OrgStore from '../data/stores/OrgStore'
import _ from 'lodash'


import About from './About'
import Contact from './Contact'

let guestNavTypes = [
  'Register',
  'Log In',
  'About',
  'Contact'
]
let userNavTypes = [
    'Log Out',
    'About',
    'Contact'
]
let orgNavTypes = [
    'Log Out',
    'About',
    'Contact'
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
    return(
      headerList.map((headerItem, i) => {
        switch(headerItem){
          case 'Register':
            return(
              <li key={i}><NavLink key={i} to='/register'>Register</NavLink></li>
            )
            break
          case 'Log In':
            return(
              <li key={i}><NavLink key={i} to='/login'>Log In</NavLink></li>
            )
            break
          case 'Log Out':
            return(
              <li key={i}><a key={i} onClick={() => this.handleLogOut()}>Log Out</a></li>
            )
            break
          case 'About':
            return( <About /> )
            break
          case 'Contact':
            return( <Contact /> )
            break
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
