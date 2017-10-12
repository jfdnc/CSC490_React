import React from 'react'
import LogStore from '../data/stores/LogStore'
import PageNav from './PageNav'
import { Glyphicon } from 'react-bootstrap'
import GuestView from './GuestView'
import UserView from './UserView'
import OrgView from './OrgView'
import Register from './Register'
import Login from './Login'
import About from './About'
import Contact from './Contact'

import { BrowserRouter,Route } from 'react-router-dom'


export default class MainView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: LogStore.getLogState(),
      userType: LogStore.getUserType(),
      menuOpen: false,
    }

    this.loadView = this.loadView.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.displayHome = this.displayHome.bind(this)
  }

  componentWillMount(){
    this.setState({currentView: this.loadView()})

    LogStore.on("change", () => {
      this.setState({
        loggedIn: LogStore.getLogState(),
        userType: LogStore.getUserType(),
        currentView: this.loadView(LogStore.getUserType())
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

  displayHome(){
    LogStore.displayHome('guest')
  }

  toggleMenu(){
  }

  render(){
    return(
      <div id='main-container'>
        <div id="header-wrap">
            <div id="header-logo" onClick={this.displayHome} >{this.props.name}</div>
            <PageNav />
            <div id="menu-icon" onClick={this.toggleMenu}>
              <Glyphicon glyph="align-justify"/>
            </div>
        </div>

        {this.state.currentView}

        <div id="footer-wrap">
          <div id="footer-links">
            <div id="footer-about" className="footer-link">About</div>
            <div id="footer-contact" className="footer-link">Contact</div>
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
