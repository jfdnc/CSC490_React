import React from 'react'
import MainContent from './MainContent.jsx'

export default class Content extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div id="content-div">
      <div id="log-buttons">
        <div id="sign-up" className="log-button">Sign Up</div>
        <div id="log-in" className="log-button">Log In</div>
      </div>
      <div id="content-container-main">
        <MainContent />
      </div>
      </div>
    )
  }
}
