import React from 'react'
import { updateDisplayUserType } from '../actions/display_actions'
import { Form, FormGroup, FormControl,
         Col, ControlLabel, Button} from 'react-bootstrap'
import { loginUser } from '../actions/user_actions'
import { loginOrg } from '../actions/org_actions'
import * as UserStore from '../data/stores/UserStore'
import * as OrgStore from '../data/stores/OrgStore'

const Login =  (props) => {

  const handleSubmit = () => {
    let inputArr = [],
        inputObj = {},
        inputs = document.getElementsByClassName('form-control')
    for(let i=0; i<inputs.length; i++){
        inputs[i].value ? inputArr.push(inputs[i].value) : null
    }

    if(inputs.length == 3){
      [inputObj.email, inputObj.pwHash] = [...inputArr]

      let userType = inputArr[2]

      const email = encodeURIComponent(inputObj.email);
      const password = encodeURIComponent(inputObj.pwHash);
      if(userType == 'user'){
        const formData = `email=${email}&pwHash=${password}`;
        console.log("Logging in user...")
        loginUser(formData)
      }
      else if(userType == 'org'){
        const formData = `orgEmail=${email}&orgPwHash=${password}`;
        console.log("Logging in organization...")
        loginOrg(formData)
      }

      //do sanity checking here and then submit to user and org store
      //console.log(email.value, pw.value)
    } else {
      console.log('must provide email and pw')
    }
  }

  return(
    <Fade>
      <div id='login-view' className='view-container'>
      <div id='onsite'>
        <Form horizontal onSubmit={(e) => {e.preventDefault(); handleSubmit()}} >
          <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
              E-mail:
            </Col>
            <Col sm={8}>
              <FormControl placeholder='email@example.com'></FormControl>
            </Col>
            <Col componentClass={ControlLabel} sm={4}>
              Password:
            </Col>
            <Col sm={8}>
              <FormControl placeholder='Password'></FormControl>
            </Col>

            <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={4}>
                User Type:
              </Col>
            <Col sm={7}>
                <FormControl componentClass="select" placeholder="Select One">
                  <option value="null">Select One...</option>
                  <option value="user">User</option>
                  <option value="org">Organization</option>
                </FormControl>
            </Col>
              </FormGroup>
          </FormGroup>
          <Button type='submit' bsStyle='primary'>Submit</Button>
        </Form>
      </div>
      <div id='offsite'>
        offsite login
      </div>
      </div>
    </Fade>
    )
}

export default Login
