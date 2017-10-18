import React from 'react'
import { Glyphicon, Collapse, Modal } from 'react-bootstrap'
import DisplayStore from '../data/stores/DisplayStore'
import { displayRegister,
         displayLogin,
         displayAbout,
         displayContact } from '../actions/actions/display_actions'

export default class PageNav extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      userType: DisplayStore.getUserType(),
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount(){
    DisplayStore.on("change", () => {
      this.setState({
        userType: DisplayStore.getUserType()
      })
    })
  }

  handleClick(type){
    switch(type){
      case 'reg':
        displayRegister()
        break
      case 'log':
        displayLogin()
        break
      case 'abt':
        displayAbout()
        break
      case 'ctc':
        displayContact()
        break
    }
  }

  render(){
    return(
      <div id="menu">
        <ul>
          <li onClick={() => this.handleClick('reg')}>Register</li>
          <li onClick={() => this.handleClick('log')}>Login</li>
          <li onClick={() => this.handleClick('abt')}>About</li>
          <li onClick={() => this.handleClick('ctc')}>Contact</li>
        </ul>
      </div>
    )
  }
}
