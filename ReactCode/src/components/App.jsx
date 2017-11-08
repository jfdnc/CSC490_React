import React from 'react'
import MainView from './MainView.jsx'
import { BrowserRouter, Route } from 'react-router-dom'
import PageNav from './PageNav.jsx'
import Footer from './Footer.jsx'

const App = (props) => {
  return(
      <div id='app-container'>
        <BrowserRouter>
          <PageNav/>
        </BrowserRouter>
        <Footer/>
      </div>
  )
}

export default App
