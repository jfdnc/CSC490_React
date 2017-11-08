import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem, Button } from 'react-materialize'
import { logOut } from '../actions/user_actions'
import UserStore from '../data/stores/UserStore'
import OrgStore from '../data/stores/OrgStore'

let navTypesLoggedOut = [
      {
        headerType: 'Register',
        urlext: '/register'
      },{
        headerType: 'Log In',
        urlext: '/login'
      },{
        headerType: 'About',
        urlext: '/about'
      },{
        headerType: 'Contact',
        urlext: '/contact'
      }
    ],
    navTypesLoggedIn = [
    {
      headerType: 'Log Out'
    },{
      headerType: 'About',
      urlext: '/about'
    },{
      headerType: 'Contact',
      urlext: '/contact'
    }
  ]

export default class Menu extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      userLoggedIn: false
    }

    this.mapNavHeaders = this.mapNavHeaders.bind(this)
  }

  componentWillMount(){
    if(UserStore.isLoggedIn()){
      this.setState({ userLoggedIn: true })
    }

    UserStore.on('change',()=>{
      if(UserStore.isLoggedIn()){
        this.setState({ userLoggedIn: true })
      } else {
        this.setState({ userLoggedIn: false })
      }
    })
  }


  mapNavHeaders(headerList){
    return(
      headerList.map((headerItem, i) => {
        if(headerItem.headerType == 'Log Out'){
          return (
            <NavItem key={i} href={'/'} onClick={logOut}>{headerItem.headerType}</NavItem>
          )
        } else {
          return(
            <NavItem key={i} href={headerItem.urlext}>{headerItem.headerType}</NavItem>
          )
        }
      })
    )
  }

  render(){
    let navMapFunc = (logState) => {
      if(logState){
        return this.mapNavHeaders(navTypesLoggedIn)
      } else {
        return this.mapNavHeaders(navTypesLoggedOut)
      }
    }
    return(
      <div>
        <Navbar brand='eVol' href='/' right>
          {
            navMapFunc(this.state.userLoggedIn)
          }
        </Navbar>
      </div>
    )
  }
}
