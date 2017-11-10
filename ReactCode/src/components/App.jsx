import React from 'react'
import MainView from './MainView.jsx'
import PageNav from './PageNav.jsx'
import Footer from './AppFooter.jsx'
import { Route } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import NewVolOp from './NewVolOp'
const App = (props) => {
  return(
      <div id='app-container'>
        <div className="content">
          <Route path="/" component={PageNav}/>
          <Route path="/" exact component={MainView}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/newvolop" component={NewVolOp}/>
        </div>
        <Footer/>
      </div>
  )
}

export default App
