import React from 'react'
import { Navbar, NavItem } from 'react-materialize'
import { NavLink, Route } from 'react-router-dom'
import { logOut } from '../actions/user_actions'
import UserStore from '../data/stores/UserStore'
import OrgStore from '../data/stores/OrgStore'
import Register from './Register'
import Login from './Login'
import About from './About'
import Contact from './Contact'
import MainView from './MainView'
import OrgView from './OrgView'
import UserView from './UserView'
import NewVolOp from './NewVolOp'


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
    console.log(OrgStore.getAll().org)

    UserStore.on('change', () => {
      console.log(UserStore.getAll().user)
    })

    OrgStore.on('change', () =>{
      console.log(OrgStore.getAll().org)
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
          <Route path="/orgview" component={OrgView}/>
          <Route path="/userview" component={UserView}/>
          <Route path="/newvolop" component={NewVolOp}/>
        </div>
        </div>
      )
    }
}
