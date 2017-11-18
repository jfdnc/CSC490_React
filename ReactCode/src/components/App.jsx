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
import EditUser from './EditUser'
import { initFBState,saveVolOp } from '../actions/user_actions'
import Loading from './Loading'
//import { initFBState,initVolOps,saveVolop } from '../actions/user_actions'

const App = (props) => {

  //Handle Social Media Login
window.onload = function () {

    

    var url_string = window.location.href
    var url = new URL(url_string);
    var jwtToken = url.searchParams.get("jwt")

    if(jwtToken!=null){
      localStorage.setItem('token', jwtToken);
      var changeEmail = url.searchParams.get("changeEmail")
      var email = url.searchParams.get("email")
      var newUser = {
              firstName:  url.searchParams.get("firstName"),
              lastName: url.searchParams.get("lastName"),
              email: email,
              _id: url.searchParams.get("id")

            }
      localStorage.setItem('userInfo', JSON.stringify(newUser))
      

        //twitter hack to get email
        if(changeEmail==1){
          
          //regex for email, return true if email is in proper format
          function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
          }
          var newEmail = prompt("Please Enter an email address to continue")
          while(!validateEmail(email)){
            newEmail = prompt("Please Enter a valid email to continue")
          }
          email = newEmail
          var oldUser = {
            _id:  url.searchParams.get("id"),
            email: email
          }

          let myReq = new Request('/api/users/'+oldUser._id, {method:'PUT', body: JSON.stringify(oldUser),
            headers: {"Content-Type": "application/json"}})
          fetch(myReq)
          .then(function(res){
            //console.log(res)
            var newUser2 = {
              firstName:  url.searchParams.get("firstName"),
              lastName: url.searchParams.get("lastName"),
              email: email,
              _id: url.searchParams.get("id")

            }
            initFBState(jwtToken,newUser2)
            /*
               let savedVolOP = localStorage.getItem('savedVolOP') || false
              if(savedUserState){
               saveVolOP(url.searchParams.get("id"),JSON.parse(saveVolop))
             }
           */
          })
          .catch(function(err){
            console.log(err)
          })
        } else{
        //end hack, proceed normally

        var newUser = {
          firstName:  url.searchParams.get("firstName"),
          lastName: url.searchParams.get("lastName"),
          email: email,
          _id: url.searchParams.get("id")

        }
        initFBState(jwtToken,newUser)
      }


      let loader = document.getElementById('loader-overlay')
          document.getElementById('loading-message').innerHTML ='Logging in...'
          loader.style.visibility ='visible'
          setTimeout(() => {
            if(localStorage.getItem('userInfo')){
              loader.style.visibility ='hidden'
              
              //props.history.push('/')
            } else {
              loader.style.visibility ='hidden'
              //loginWarning.fail('user')
              console.log("falied to login")
            }
          }, 1000)

      window.history.replaceState({}, document.title, "/");
      window.location.reload();


    }  
    //window.location.href = "http://localhost:3000"

  }
  //END


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
          <Route path="/edituser" component={EditUser}/>
        </div>
        <Footer/>
      </div>
  )
}

export default App
