import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem } from 'react-materialize'
import { logOut } from '../actions/user_actions'

const Menu = (props) => {
  let navTypes = [
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
  ]
  /*
  switch(props.userType){
    case 'guest':
      navTypes = ['Volunteer Opportunities','Register', 'Login', 'Logout']
    break
    case 'user':
      navTypes = ['Settings', 'Log Out']
    break
    case 'org':
      navTypes = ['Settings', 'Log Out']
    break
  }*/

  const mapNavHeaders = (headerList) => {
    return(
      headerList.map((headerItem, i) => {
        return(
            <NavItem key={i} href={headerItem.urlext}>{headerItem.headerType}</NavItem>
        )
      })
    )
  }

  return(
    <div>
      <Navbar brand='eVol' href='/' right>
        {
          mapNavHeaders(navTypes)
        }
      </Navbar>
    </div>
  )
}

export default Menu
