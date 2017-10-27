import React from 'react'
import { displayRegister,
         displayLogin,
         displayAbout,
         displayContact } from '../actions/display_actions'
import { Navbar, NavItem } from 'react-materialize'

const PageNav = (props) => {
  let navTypes
  switch(props.userType){
    case 'guest':
      navTypes = ['Register', 'Login', 'About', 'Contact']
    break
    case 'user':
      navTypes = ['About', 'Contact']
    break
    case 'org':
      navTypes = ['About', 'Contact']
    break
  }

  const handleClick = (type) => {
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
      <Navbar id='page-nav'>
        {
          mapNavHeaders(navTypes)
        }
      </Navbar>
    )
}

export default PageNav
