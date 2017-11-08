import React from 'react'
import { Navbar, NavItem } from 'react-materialize'
import { NavLink, Route } from 'react-router-dom'
import { logOut } from '../actions/user_actions'
import UserStore from '../data/stores/UserStore'
import Register from './Register'
import Login from './Login'
import About from './About'
import Contact from './Contact'
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
      userLoggedIn: false,
      userType: ''
    }

    this.mapNavHeaders = this.mapNavHeaders.bind(this)
  }

  componentWillMount(){
    let userLoggedIn = false
    console.log(UserStore.getAll().user)

    UserStore.on('change', () => {
      console.log(UserStore.getAll().user)
    })

  }

  mapNavHeaders(headerList){
    return(
      headerList.map((headerItem, i) => {
        if(headerItem.navText == 'Log Out'){
          return(
            <li key={i}><NavLink key={i} onClick={headerItem.logOut}>{headerItem.navText}</NavLink></li>
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
      return(
        <div>
        <div id='nav-bar-strip'/>
        <Navbar brand={<NavLink to='/'>eVol</NavLink>} id='page-nav' right>
          {
            this.mapNavHeaders(guestNavTypes)
          }
        <div style={{color:'red'}}>user logged in: {this.state.userLoggedIn ? 'true' : 'false'}</div>
        </Navbar>
        <div className="content">
          <Route path="/" exact component={MainView}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>
        </div>
        </div>
      )
    }
}
