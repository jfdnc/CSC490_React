import React from 'react'
import { SideNav, SideNavItem } from 'react-materialize'
import MediaQuery from 'react-responsive'

const Contact = (props) => {
    return(
      <li>
        <MediaQuery query="(max-width: 992px)">
          <SideNav
            trigger={<li><a>Contact</a></li>}
            options={{ closeOnClick: true, edge: 'left'}}
            >
            <div id='nav-bar-strip'/>
            <SideNavItem onClick={(e) => {
              e.preventDefault()
              return false
            }}>Contact</SideNavItem>
            <SideNavItem divider />
            <SideNavItem subheader>Subheader</SideNavItem>
          </SideNav>
        </MediaQuery>
        <MediaQuery query="(min-width: 992px)">
          <SideNav
            trigger={<li><a>Contact</a></li>}
            options={{ closeOnClick: true, edge: 'right', menuWidth:'450px'}}
            >
            <div id='nav-bar-strip'/>
            <SideNavItem onClick={(e) => {
              e.preventDefault()
              return false
            }}>Contact</SideNavItem>
            <SideNavItem divider />
            <SideNavItem subheader>Subheader</SideNavItem>
          </SideNav>
        </MediaQuery>
      </li>
    )
}

export default Contact
