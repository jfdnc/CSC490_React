import React from 'react'
import MainView from './MainView.jsx'
import PageNav from './PageNav.jsx'
import Footer from './AppFooter.jsx'
import { Route } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import NewVolOp from './NewVolOp'
import EditVolOp from './EditVolOp'
import { initFBState } from '../actions/user_actions'

const App = (props) => {

  window.onload = function () {
    var url_string = window.location.href
    var url = new URL(url_string);
    var jwtToken = url.searchParams.get("jwt")

    if(jwtToken!=null){
      var newUser = {
        firstName:  url.searchParams.get("firstName"),
        lastName: url.searchParams.get("lastName"),
        email: url.searchParams.get("email")
      }
        initFBState(jwtToken,newUser)
        window.history.replaceState({}, document.title, "/");
    }
  }
  return(
      <div id='app-container'>
        <div className="content">
          <Route path="/" component={PageNav}/>
          <Route path="/" exact component={MainView}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/newvolop" component={NewVolOp}/>
          <Route path="/editvolop" component={EditVolOp}/>
        </div>
        <Footer/>
      </div>
  )
}

export default App
