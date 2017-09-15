import React from 'react'
import DropDown from './DropDown.jsx'
import ContentContainer from './ContentContainer.jsx'
import { Glyphicon } from 'react-bootstrap'
import gso_bg from '../assets/gso_downtown.jpg'

export default class MainLayout extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      menuVisible: false,
      dropdownGlyph: "align-justify",
      message: "eVol is super awesome!",
      appName: props.name
    }

    this.toggleMenu = this.toggleMenu.bind(this)
  }

  componentDidMount(){
    document.getElementById("splash").style.backgroundImage = `url(${gso_bg})`
  }

  toggleMenu(){
    var dropDownMenu = document.getElementById("dropdown-menu")
    if(this.state.menuVisible){
      dropDownMenu.style.display = "none"
      dropDownMenu.style.height = "0px"
      this.setState({menuVisible:!this.state.menuVisible,dropdownGlyph:"align-justify"})
    } else {
      dropDownMenu.style.display = "initial"
      dropDownMenu.style.height = "180px"
      this.setState({menuVisible:!this.state.menuVisible,dropdownGlyph:"remove"})
    }
  }

  render(){
    return(
      <div id='main-container'>
        <div id="header">
          <div id="header-logo">{this.state.appName}</div>
          <div id="dropdown-menu-icon" onClick={this.toggleMenu}>
            <Glyphicon glyph={this.state.dropdownGlyph}/>
          </div>
          <DropDown />
        </div>

        <div id="splash">
          <div id="splash-message">{this.state.appName}</div>
        </div>
        <ContentContainer />
        <div id="footer">
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
