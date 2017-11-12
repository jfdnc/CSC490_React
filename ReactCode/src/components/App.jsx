import React from 'react'
import MainView from './MainView.jsx'
import PageNav from './PageNav.jsx'
import Footer from './AppFooter.jsx'
import { Route } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import NewVolOp from './NewVolOp'
import EditVolOp from './EditVolOp'
import EditOrg from './EditOrg'
import { initFBState } from '../actions/user_actions'
import Loading from './Loading'
//import { initFBState,initVolOps,saveVolop } from '../actions/user_actions'

const App = (props) => {

  window.onload = function () {
    var url_string = window.location.href
    var url = new URL(url_string);
    var jwtToken = url.searchParams.get("jwt")

    if(jwtToken!=null){
      var newUser = {
        firstName:  url.searchParams.get("firstName"),
        lastName: url.searchParams.get("lastName"),
        email: url.searchParams.get("email"),
        _id: url.searchParams.get("id")

      }
        initFBState(jwtToken,newUser)

        window.history.replaceState({}, document.title, "/");

    }

      /*
    let savedUserState = localStorage.getItem('userInfo') || false
    if(savedUserState){
      console.log(JSON.parse(savedUserState)+"in app")
      var myUser = JSON.parse(savedUserState)
      initVolOps(myUser.email)
    }
    */
  }
  return(
      <div id='app-container'>
        <Loading />
        <div className="content">
          <Route path="/" component={PageNav}/>
          <Route path="/" exact component={MainView}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/newvolop" component={NewVolOp}/>
          <Route path="/editvolop" component={EditVolOp}/>
          <Route path="/editorg" component={EditOrg}/>
        </div>
        <Footer/>
      </div>
  )
}

export default App
