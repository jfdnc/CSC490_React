import React from 'react'
import MainView from './MainView.jsx'

export default class App extends React.Component {
  render(){
    return(
      <div id='app-container'>
        <MainView name="eVol" />
      </div>
    )
  }
}
