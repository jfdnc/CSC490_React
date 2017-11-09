import React from 'react'
import MainView from './MainView.jsx'
import PageNav from './PageNav.jsx'
import Footer from './AppFooter.jsx'
import { Route } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import About from './About'
import Contact from './Contact'

const App = (props) => {
  return(
      <div id='app-container'>
        <PageNav/>
        <div className="content">
          <Route path="/" exact component={MainView}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>
        </div>
        <Footer/>
      </div>
  )
}

export default App
