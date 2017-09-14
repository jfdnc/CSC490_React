import React from 'react'
import { Glyphicon } from 'react-bootstrap'

export default class DropDown extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      menuItemExpanded: false
    }

    this.expandMenuItem = this.expandMenuItem.bind(this)
  }

  expandMenuItem(item){
    //this.setState({menuItemExpanded:!this.state.menuItemExpanded})
    console.log(item)
    switch(item){
      case "register":
      break
      case "login":
      break
      case "about":
      break
      case "contact":
      break
    }
  }

  render(){
    return(
      <div id="dropdown-menu">
        <div id="menu-list">
          <div className="list-item" onClick={this.expandMenuItem}>Register <Glyphicon glyph="chevron-right" className="pull-right"/></div>
          <div className="list-item" onClick={this.expandMenuItem}>Log In   <Glyphicon glyph="chevron-right" className="pull-right"/></div>
          <div className="list-item" onClick={this.expandMenuItem}>About    <Glyphicon glyph="chevron-right" className="pull-right"/></div>
          <div className="list-item" onClick={this.expandMenuItem}>Contact  <Glyphicon glyph="chevron-right" className="pull-right"/></div>
        </div>
      </div>
    )
  }
}
