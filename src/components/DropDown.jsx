import React from 'react'
import { Glyphicon } from 'react-bootstrap'

export default class DropDown extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      menuItemExpanded: false,
      dropdownGlyph: "chevron-right",
    }

    this.menuClick = this.menuClick.bind(this)
    this.setChevron = this.setChevron.bind(this)
    this.removeMenuItems = this.removeMenuItems.bind(this)
    this.expandRegister = this.expandRegister.bind(this)
    this.expandLogin = this.expandLogin.bind(this)
    this.expandAbout = this.expandAbout.bind(this)
    this.expandContact = this.expandContact.bind(this)
  }

  componentWillReceiveProps(props){
    if(!props.menuVisible){
      this.state.dropdownGlyph = "chevron-right"
    }
  }

  menuClick(item){
    this.setChevron(!this.state.menuItemExpanded)
    this.setState({menuItemExpanded: !this.state.menuItemExpanded})
    var menu_ids = ["menu-reg","menu-log","menu-abt","menu-con"]
    switch(item){
      case "register":
      if(!this.state.menuItemExpanded){
      this.removeMenuItems(menu_ids.filter(id => id != "menu-reg"))
      } else {
      this.replaceMenuItems(menu_ids.filter(id => id != "menu-reg"))
      }
      break
      case "login":
      if(!this.state.menuItemExpanded){
      this.removeMenuItems(menu_ids.filter(id => id != "menu-log"))
      } else {
      this.replaceMenuItems(menu_ids.filter(id => id != "menu-log"))
      }
      break
      case "about":
      if(!this.state.menuItemExpanded){
      this.removeMenuItems(menu_ids.filter(id => id != "menu-abt"))
      } else {
      this.replaceMenuItems(menu_ids.filter(id => id != "menu-abt"))
      }
      break
      case "contact":
      if(!this.state.menuItemExpanded){
      this.removeMenuItems(menu_ids.filter(id => id != "menu-con"))
      } else {
      this.replaceMenuItems(menu_ids.filter(id => id != "menu-con"))
      }
      break
    }
  }

  setChevron(menuExpanded){
    this.setState({dropdownGlyph: menuExpanded ? "chevron-down" : "chevron-right"})
  }

  removeMenuItems(ids){
    ids.map(id => {
      document.getElementById(id).style.display = "none"
    })
  }
  replaceMenuItems(ids){
    ids.map(id => {
      document.getElementById(id).style.display = "block"
    })
  }

  expandRegister(ids){

  }
  expandLogin(ids){

  }
  expandAbout(ids){

  }
  expandContact(ids){

  }

  render(){
    return(
      <div id="dropdown-menu">
        <div id="menu-list">
          <div className="list-item" id="menu-reg" onClick={() => this.menuClick("register")}>Register <Glyphicon glyph={this.state.dropdownGlyph} className="pull-right"/></div>
          <div className="list-item" id="menu-log" onClick={() => this.menuClick("login")}>Log In   <Glyphicon glyph={this.state.dropdownGlyph} className="pull-right"/></div>
          <div className="list-item" id="menu-abt" onClick={() => this.menuClick("about")}>About    <Glyphicon glyph={this.state.dropdownGlyph} className="pull-right"/></div>
          <div className="list-item" id="menu-con" onClick={() => this.menuClick("contact")}>Contact  <Glyphicon glyph={this.state.dropdownGlyph} className="pull-right"/></div>
        </div>
      </div>
    )
  }
}
