import React from 'react'
import { displayRegister,
         displayLogin,
         displayAbout,
         displayContact,
         displayHome } from '../actions/display_actions'
import { Navbar, NavItem } from 'react-materialize'

const PageNav = (props) => {
  let navTypes
  switch(props.userType){
    case 'guest':
      navTypes = ['Register', 'Login', 'About', 'Contact']
    break
    case 'user':
      navTypes = ['Settings', 'Log Out']
    break
    case 'org':
      navTypes = ['Settings', 'Log Out']
    break
  }

  const handleClick = (type) => {
    console.log('clicked')
    switch(type) {
      case 'Register':
        displayRegister()
        break
      case 'Login':
        displayLogin()
        break
      case 'About':
        displayAbout()
        break
      case 'Contact':
        displayContact()
        break
      case 'Home':
        displayHome()
        break
    }
  }

  const mapNavHeaders = (headerList) => {
    return(
      headerList.map((headerItem, i) => {
        return(
          <NavItem key={i} onClick={(e) => {
            e.preventDefault()
            handleClick(`${headerItem}`)}}>{headerItem}</NavItem>
        )
      })
    )
  }

    return(
      <div>
      <div id='nav-bar-strip'/>
      <Navbar brand='eVol' id='page-nav' right>
        {
          mapNavHeaders(navTypes)
        }
      </Navbar>
      </div>
    )
}

export default PageNav
