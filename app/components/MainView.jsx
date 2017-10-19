import React from 'react'
import DisplayStore from '../data/stores/DisplayStore'
import PageNav from './PageNav'
import { Glyphicon } from 'react-bootstrap'
import GuestView from './GuestView'
import UserView from './UserView'
import OrgView from './OrgView'
import Register from './Register'
import Login from './Login'
import About from './About'
import Contact from './Contact'
import { displayHome,
         displayAbout,
         displayContact } from '../actions/actions/display_actions'

import { CSSTransition } from 'react-transition-group'


export default class MainView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: DisplayStore.getLogState(),
      userType: DisplayStore.getUserType(),
      menuOpen: false,
    }

    this.loadView = this.loadView.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.logMain = this.logMain.bind(this)
  }

  //for debugging in main window -- REMOVE for general use
  logMain(){
    console.log(this.state)
    this.toggleMenu()
  }

  componentWillMount(){
    this.setState({currentView: this.loadView()})

    DisplayStore.on("change", () => {
      this.setState({
        loggedIn: DisplayStore.getLogState(),
        userType: DisplayStore.getUserType(),
        currentView: this.loadView(DisplayStore.getUserType())
      })
    })
  }

  loadView(type){
    switch(type){
      case 'guest':
        return <GuestView />
        break
      case 'user':
        return <UserView />
        break
      case 'org':
        return <OrgView />
        break
      case 'register':
        return <Register />
        break
      case 'login':
        return <Login />
        break
      case 'about':
        return <About />
        break
      case 'contact':
        return <Contact />
        break
      default:
        return <GuestView />
    }
  }

  toggleMenu(){
    document.getElementById('menu').style.visibility = 'visible'
  }

  render(){
    return(
      <div id='main-container'>
        <div id="header-wrap">
            <div id="header-logo" onClick={displayHome} >{this.props.name}</div>
            {/*log button -- remove later */}
            <button style={{'highlightSelect':'none','boxShadow':'none','border':'none','background':'red','width':'20px','height':'10px', 'position':'absolute'}}onClick={this.logMain}></button>
            <PageNav />
            <div id="menu-icon" onClick={this.toggleMenu}>
              <Glyphicon glyph="align-justify"/>
            </div>
        </div>

        <div id="content-container">
          {this.state.currentView}
        </div>

        <div id="footer-wrap">
          <div id="footer-links">
            <div id="footer-about" className="footer-link" onClick={displayAbout}>About</div>
            <div id="footer-contact" className="footer-link" onClick={displayContact}>Contact</div>
            <div id="footer-tou" className="footer-link">Terms of Use</div>
            <div id="social-links">
              <div id="fb-link" className="social-link"><i className="fa fa-facebook-square"/></div>
              <div id="tw-link" className="social-link"><i className="fa fa-twitter-square"/></div>
            </div>
          </div>
          <div id="footer-side-info">
            <div id="footer-logo">eVol</div>
            <div id="footer-bottom-info">
              <div id="footer-email"> Email:<br/>eVolunteersUNCG@gmail.com
              </div>
              <div id="footer-copyright">
                2017 eVolunteers
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
