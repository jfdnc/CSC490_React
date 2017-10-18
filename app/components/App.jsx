import React from 'react'
import MainView from './MainView.jsx'
import { BrowserRouter } from 'react-router-dom'

export default class App extends React.Component {
  render(){
    return(
        <div id='app-container'>
          <BrowserRouter>
            <MainView name="eVol" />
          </BrowserRouter>
        </div>
    )
  }
}
