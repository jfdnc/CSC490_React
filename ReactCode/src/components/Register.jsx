import React from 'react'
import { Tabs, Tab, Button, Col, Row, Input } from 'react-materialize'
import { createUser, loginUser } from '../actions/user_actions'
import { createOrg } from '../actions/org_actions'
import Fade from './Fade'
import UserStore from '../data/stores/UserStore'

const Register = (props) => {

  //stupid but it works to make both not display at once
  let orgTabClicked = false
  const handleFirstClick = () =>{
    if(!orgTabClicked){
      let tempTabId = document.getElementsByClassName('active')[1].href.split('_')[1]
      document.getElementById(`tab_${tempTabId}`).style.display = 'none'
      orgTabClicked = true
    }
  }

  const handleSubmit = (userType) => {
    let inputArr = [],
        inputObj = {},
        inputs = document.getElementsByTagName('input')
    for(let i=0; i<inputs.length; i++){
      inputs[i].value ? inputArr.push(inputs[i].value) : null
    }
    console.log(inputArr)
    if(userType == 'user' && inputArr.length == 6){
      [ inputObj.firstName,
        inputObj.lastName,
        inputObj.zipCode,
        inputObj.email,
        inputObj.pwHash ] = [...inputArr]

      let registerResponse
      createUser(inputObj).then(res => registerResponse = res)
      let loader = document.getElementById('loader-overlay')
      let loadingMessage = document.getElementById('loading-message')
      loadingMessage.innerHTML ='Registering...'
      loader.style.visibility ='visible'
      setTimeout(() => {
        if(registerResponse == 200){
          loadingMessage.innerHTML ='Logging In...'
          loginUser({email:inputObj.email,pwHash:inputObj.pwHash})
          setTimeout(() => {
            if(localStorage.getItem('token')){
              loader.style.visibility ='hidden'
              props.history.push('/')
            } else {
              //display login error
              console.log('login error')
            }
          }, 1000)
        } else {
          loader.style.visibility ='hidden'
          //display registration error
          console.log("registration error")
        }
      }, 1000)


    } else if( userType == 'org' && inputArr.length == 12){

      inputObj = {
        orgName: inputArr[0],
        orgEmail: inputArr[1],
        orgPwHash: inputArr[2],
        orgAddress: {
          street: inputArr[4],
          city: inputArr[5],
          state: inputArr[6],
          zip: inputArr[7]
        },
        orgDescription: inputArr[8],
        orgPhone: inputArr[9],
        orgWebsite: inputArr[10],
        orgContactPerson: inputArr[11]
      };

        createOrg(inputObj).then(props.history.push('/'))

    } else {
      console.log('enter values in all fields!')
    }
  }

  return(
    <div>
      <Fade>
      <div id='register-view' className='view-container'>
        <div id='onsite'>
          <Tabs defaultActiveKey={1}  id='registration-tabs' onChange={() => handleFirstClick()}>
            {/*user fields*/}
            <Tab key={1} title='User' id='user-reg-tab' active>
              <Row>
                <Input s={6} label="First Name"></Input>
                <Input s={6} label="Last Name"></Input>
              </Row>
              <Row>
                <Input s={6} label="ZIP"></Input>
                <Input s={6} label="Email" type='email' validate></Input>
              </Row>
                <Input s={12} label="Password" type='password'></Input>
                <Input s={12} label="Confirm Password" type='password'></Input>
              <Button onClick={()=>handleSubmit('user')}>Submit</Button>
            </Tab>
            {/*org fields*/}
            <Tab  key={2} title='Organization'>
            <Row>
              <Input s={6} label="Org Name"></Input>
              <Input s={6} label="Org Email" type='email' validate></Input>
            </Row>
            <Input s={12} label="Password" type='password'></Input>
            <Input s={12} label="Confirm Password" type='password'></Input>
            <Row>
              <Input s={6} label="Street"></Input>
              <Input s={6} label="City"></Input>
            </Row>
            <Row>
              <Input s={6} label="State"></Input>
              <Input s={6} label="Zip"></Input>
            </Row>
              <Input s={12} label="Description"></Input>
            <Row>
              <Input s={6} label="Phone"></Input>
              <Input s={6} label="Website"></Input>
            </Row>
            <Input s={12} label="Contact Name" type='text'></Input>
            <Button onClick={()=>handleSubmit('org')}>Submit</Button>
            </Tab>
          </Tabs>
        </div>
        <div id='offsite'>
          offsite registration
          <div>
          <a href={UserStore.getAll().facebookURL} className="btn btn-primary"><span className="fa fa-facebook"></span> Facebook</a>
          </div>
        </div>
      </div>
      </Fade>
    </div>
  )
}

export default Register
