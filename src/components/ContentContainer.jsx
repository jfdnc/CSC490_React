import React from 'react'
import MainContent from './MainContent.jsx'

export default class Content extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div id="content-div">
        <div id="content-container-main">
          <MainContent />
        </div>
      </div>
    )
  }
}
