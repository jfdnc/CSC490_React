import React from 'react'
import { Tabs, Tab, Button, Col, Row, Input } from 'react-materialize'
import { createUser, loginUser } from '../actions/user_actions'
import { createOrg } from '../actions/org_actions'
import Fade from './Fade'

const Register = (props) => {
  let criticalVals = {
    user:{
      zip: '',
      email: '',
      pw: '',
      pwconf: ''
    },
    org:{
      email: '',
      zip: '',
      phone: '',
      website: '',
      pw: '',
      pwconf: ''
    }
  }

  //checking input values as they are typed
  //TODOhandle backspace correctly
  //TODOcause DOM changes per values
  const handleKeyDown = (e,userType,valType) => {
    criticalVals[userType][valType] += e.key
    console.log(`value of ${valType} in ${userType}: ${criticalVals[userType][valType]}`)
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

      createUser(inputObj).then(
        loginUser({email:inputObj.email,pwHash:inputObj.pwHash})
      ).then(props.history.push('/'))

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
          <Tabs defaultActiveKey={1} id='registration-tabs'>
            {/*user fields*/}
            <Tab eventKey={1} title='User' active>
              <Row>
                <Input s={6} label="First Name"></Input>
                <Input s={6} label="Last Name"></Input>
              </Row>
              <Row>
                <Input s={6} label="ZIP" onKeyDown={(e)=>handleKeyDown(e,'user','zip')}></Input>
                <Input s={6} label="Email" onKeyDown={(e)=>handleKeyDown(e,'user','email')} type='email' validate></Input>
              </Row>
                <Input s={12} label="Password" onKeyDown={(e)=>handleKeyDown(e,'user','pw')} type='password'></Input>
                <Input s={12} label="Confirm Password" onKeyDown={(e)=>handleKeyDown(e,'user','pwconf')} type='password'></Input>
              <Button onClick={()=>handleSubmit('user')}>Submit</Button>
            </Tab>
            {/*org fields*/}
            <Tab eventKey={2} title='Organization'>
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
        </div>
      </div>
      </Fade>
    </div>
  )
}

export default Register
