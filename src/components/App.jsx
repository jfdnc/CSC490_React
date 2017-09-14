import React from 'react'
import MainLayout from './MainLayout.jsx'

export default class App extends React.Component {
  render(){
    return(
      <div id='app-container'>
        <MainLayout name="eVol" />
      </div>
    )
  }
}
