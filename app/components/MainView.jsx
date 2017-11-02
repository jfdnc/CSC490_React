import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import DisplayStore from '../data/stores/DisplayStore'
import { displayAbout, displayContact, updateDisplayUserType } from '../actions/display_actions'
import UserStore from '../data/stores/UserStore'
import PageNav from './PageNav'
import GuestView from './GuestView'
import UserView from './UserView'
import OrgView from './OrgView'
import Register from './Register'
import Login from './Login'
import About from './About'
import Contact from './Contact'

export default class MainView extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      displayState: {},
      userState: {},
      currentView: ""
    }

    this.loadView = this.loadView.bind(this)
  }

  componentWillMount(){
    let displayState = DisplayStore.getAll()
    //get user obj if it exists
    let userState = UserStore.getAll().user
      this.setState({
        displayState: displayState,
        userState: userState,
        currentView: this.loadView(displayState.displayType)
    })

    DisplayStore.on("change", () => {
      let displayState = DisplayStore.getAll()
      this.setState({
        displayState: displayState,
        currentView: this.loadView(displayState.displayType)
      })
    })
    //listen for changes to user state in store
    UserStore.on("change", () => {
      let userState = UserStore.getAll().user
      this.setState({
        userState: userState
      })
      //console.log(userState)
    })
  }

  loadView(displayType){
    switch(displayType){
      case 'guest':
        return <GuestView {...this.state}/>
        break
      case 'user':
        return <UserView {...this.state}/>
        break
      case 'org':
        return <OrgView {...this.state}/>
        break
      case 'register':
        return <Register {...this.state}/>
        break
      case 'login':
        return <Login {...this.state}/>
        break
      case 'about':
        return <About {...this.state}/>
        break
      case 'contact':
        return <Contact {...this.state}/>
        break
      default:
        return <GuestView {...this.state} />
    }
  }

  render(){
    //testing data gathered from userstate
    let [fname, lname, zip] = this.state.userState ?
                             [ this.state.userState.firstName,
                               this.state.userState.lastName,
                               this.state.userState.zipCode ] : 'nothing yet'
    return(
      <div id='main-container'>
        <PageNav userType={this.state.displayState.userType}/>
        <div id="content-container">
          {/*output user status*/}
          <div>`Fname: {fname} Lname: {lname} ZIP: {zip}`</div>
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
