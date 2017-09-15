import React from 'react'
import { Glyphicon, Modal } from 'react-bootstrap'
import Register from './Register.jsx'
import Login from './Login.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'


export default class DropDown extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      menuItemExpanded: false,
      dropdownGlyph: "chevron-right",
      modalContent: null
    }

    this.menuClick = this.menuClick.bind(this)
    this.updateDropdown = this.updateDropdown.bind(this)
    this.removeMenuItems = this.removeMenuItems.bind(this)
    this.expandRegister = this.expandRegister.bind(this)
    this.expandLogin = this.expandLogin.bind(this)
    this.expandAbout = this.expandAbout.bind(this)
    this.expandContact = this.expandContact.bind(this)
  }

  componentDidMount(){
    var ddicon = document.getElementById("dropdown-menu-icon")
    ddicon.addEventListener("click", () => {
      if(this.props.menuVisible){
        this.setState({menuItemExpanded: false})
        this.updateDropdown(this.state.menuItemExpanded)
      }
    })
  }

  componentWillReceiveProps(props){
    if(!props.menuVisible){
      this.state.dropdownGlyph = "chevron-right"
    }
  }

  menuClick(item){
    this.updateDropdown(!this.state.menuItemExpanded)
    this.setState({menuItemExpanded: !this.state.menuItemExpanded})
    var menu_ids = ["menu-reg","menu-log","menu-abt","menu-con"]
    switch(item){
      case "register":
      if(!this.state.menuItemExpanded){
      this.removeMenuItems(menu_ids.filter(id => id != "menu-reg"))
      } else {
      this.replaceMenuItems(menu_ids.filter(id => id != "menu-reg"))
      }
      this.expandRegister()
      break
      case "login":
      if(!this.state.menuItemExpanded){
      this.removeMenuItems(menu_ids.filter(id => id != "menu-log"))
      } else {
      this.replaceMenuItems(menu_ids.filter(id => id != "menu-log"))
      }
      this.expandLogin()
      break
      case "about":
      if(!this.state.menuItemExpanded){
      this.removeMenuItems(menu_ids.filter(id => id != "menu-abt"))
      } else {
      this.replaceMenuItems(menu_ids.filter(id => id != "menu-abt"))
      }
      this.expandAbout()
      break
      case "contact":
      if(!this.state.menuItemExpanded){
      this.removeMenuItems(menu_ids.filter(id => id != "menu-con"))
      } else {
      this.replaceMenuItems(menu_ids.filter(id => id != "menu-con"))
      }
      this.expandContact()
      break
    }
  }

  updateDropdown(menuExpanded){
    var dropDown, contentIds

    this.setState({dropdownGlyph: menuExpanded ? "chevron-down" : "chevron-right"})
    dropDown = document.getElementById("dropdown-menu")
    dropDown.style.height = menuExpanded ? "100vh" : "180px"
    dropDown.style.background = menuExpanded ? "rgba(0,0,0,0.7)" : "#fff"
    contentIds = ["content-div", "splash", "log-buttons" , "footer"]
    contentIds.map(id => {
      document.getElementById(id).style.filter = menuExpanded ? "blur(5px)" : "none"
    })
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
    this.setState({modalContent: <Register />})
  }
  expandLogin(ids){
    this.setState({modalContent: <Login />})
  }
  expandAbout(ids){
    this.setState({modalContent: <About />})
  }
  expandContact(ids){
    this.setState({modalContent: <Contact />})
  }

  render(){
    return(
      <div id="dropdown-menu">
        <div id="menu-list">
          <div className="list-item" id="menu-reg" onClick={() => this.menuClick("register")}>Register <Glyphicon glyph={this.state.dropdownGlyph} className="pull-right"/></div>
          <div className="list-item" id="menu-log" onClick={() => this.menuClick("login")}>Log In   <Glyphicon glyph={this.state.dropdownGlyph} className="pull-right"/></div>
          <div className="list-item" id="menu-abt" onClick={() => this.menuClick("about")}>About    <Glyphicon glyph={this.state.dropdownGlyph} className="pull-right"/></div>
          <div className="list-item" id="menu-con" onClick={() => this.menuClick("contact")}>Contact  <Glyphicon glyph={this.state.dropdownGlyph} className="pull-right"/></div>
          <Modal id="menu-modal" backdrop={false} animation={false} show={this.state.menuItemExpanded}>
            <Modal.Body>
              {this.state.modalContent}
            </Modal.Body>
          </Modal>
        </div>
      </div>
    )
  }
}
