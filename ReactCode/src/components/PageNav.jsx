import React from 'react'
import { Navbar, NavItem } from 'react-materialize'
import { NavLink, Route } from 'react-router-dom'
import { logOut } from '../actions/user_actions'
import UserStore from '../data/stores/UserStore'
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
    navUrl: '/about',
    navText: 'About'
  },{
    navUrl: '/contact',
    navText: 'Contact'
  },
]
let userNavTypes = [
    {
      navText: 'Log Out',
      logOut: logOut()
    },{
      navUrl: '/about',
      navText: 'About'
    },{
      navUrl: '/contact',
      navText: 'Contact'
    }
]

export default class PageNav extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      userLoggedIn: false
    }

    this.mapNavHeaders = this.mapNavHeaders.bind(this)
  }

  componentWillMount(){
    UserStore.on('change', () => {
      let loggedIn = !_.isEmpty(UserStore.getAll().user)
      this.setState({ userLoggedIn:loggedIn })
    })
  }

  mapNavHeaders(headerList){
    return(
      headerList.map((headerItem, i) => {
        if(headerItem.navText == 'Log Out'){
          return(
            <li key={i}><a key={i} onClick={headerItem.logOut}>{headerItem.navText}</a></li>
          )
        } else {
          return(
            <li key={i}><NavLink key={i} to={headerItem.navUrl}>{headerItem.navText}</NavLink></li>
          )
        }
      })
    )
  }

    render(){
      let currNavTypes = this.state.userLoggedIn ? userNavTypes : guestNavTypes
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
