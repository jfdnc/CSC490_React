import React from 'react'
import { Tabs, Tab, Button, Col, Row, Input } from 'react-materialize'
import { createUser } from '../actions/user_actions'
import { createOrg } from '../actions/org_actions'
import Fade from './Fade'

const Register = (props) => {
  const handleSubmit = (userType) => {
    let inputArr = [],
        inputObj = {},
        inputs = document.getElementsByTagName('input')
    for(let i=0; i<inputs.length; i++){
      inputs[i].value ? inputArr.push(inputs[i].value) : null
    }
    if(userType == 'user' && inputArr.length == 6){
      [ inputObj.firstName,
        inputObj.lastName,
        inputObj.zipCode,
        inputObj.email,
        inputObj.pwHash ] = [...inputArr]

      createUser(inputObj).then(props.history.push('/'))

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
                <Input s={6} label="ZIP"></Input>
                <Input s={6} label="Email"></Input>
              </Row>
                <Input s={12} label="Password" type='password'></Input>
                <Input s={12} label="Confirm Password" type='password'></Input>
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
              <Input s={12} label="Description" type='textarea'></Input>
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
