import React from 'react'
import { Input, Row, Icon, Col, Button, Form } from 'react-materialize'
import { loginUser } from '../actions/user_actions'
import { loginOrg } from '../actions/org_actions'
import Fade from './Fade'
import UserStore from '../data/stores/UserStore'
import { editPrefs, saveVolop } from '../actions/user_actions'

const Login =  (props) => {
  const handleSubmit = () => {
    let inputArr = [],
        inputObj = {},
        inputs = document.getElementsByTagName('input')
    for(let i=0; i<inputs.length; i++){
        inputs[i].value ? inputArr.push(inputs[i].value) : null
    }

    if(inputArr.length == 3){
      var userType
      [inputObj.email, inputObj.pwHash, userType] = [...inputArr]

      const email = encodeURIComponent(inputObj.email);
      const password = encodeURIComponent(inputObj.pwHash);

      if(userType.toLowerCase() == 'user'){
        const formData = `email=${email}&pwHash=${password}`;
        console.log("Logging in user...")
        loginUser(formData)
        let loader = document.getElementById('loader-overlay')
        document.getElementById('loading-message').innerHTML ='Logging in...'
        loader.style.visibility ='visible'
        setTimeout(() => {
          if(localStorage.getItem('userInfo')){
            loader.style.visibility ='hidden'
            props.history.push('/')
          } else {
            loader.style.visibility ='hidden'
            //add info about error
            console.log('login unsuccessful')
          }
        }, 1000)
      }
      else if(userType.toLowerCase() == 'organization'){
        const formData = `orgEmail=${email}&orgPwHash=${password}`;
        console.log("Logging in organization...")
        loginOrg(formData)
          let loader = document.getElementById('loader-overlay')
          document.getElementById('loading-message').innerHTML ='Logging in...'
          loader.style.visibility ='visible'
          setTimeout(() => {
            if(localStorage.getItem('orgInfo')){
              loader.style.visibility ='hidden'
              props.history.push('/')
            } else {
              //add error message here
              loader.style.visibility ='hidden'
              console.log('login unsuccessful')
            }
          }, 1000)
      }
    } else {
      console.log('must provide email and pw')
    }
  }



  const facebookURL = UserStore.getAll().facebookURL

  return(
    <div>
    <Fade>
      <div id='login-view' className='view-container'>
      <div id='onsite'>
        <Row>
          <Input s={6} label="email" validate></Input>
          <Input s={6} label="password" validate type='password'></Input>
        </Row>
            <Col>
                <Input type="select" label="User Type">
                  <option value="null">Select One...</option>
                  <option value="user">User</option>
                  <option value="org">Organization</option>
                </Input>
            </Col>
          <Button onClick={()=>handleSubmit()}>Submit</Button>
      </div>
      <div id='offsite'>
        offsite login
          <div>
          <a href={UserStore.getAll().facebookURL} className="btn btn-primary"><span className="fa fa-facebook"></span> Facebook</a>
          </div>
      </div>
      </div>
      </Fade>
    </div>
    )
}

export default Login
