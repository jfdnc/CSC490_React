import React from 'react'
import Fade from './Fade'
import { updateDisplayUserType } from '../actions/display_actions'
import { Form, FormGroup, FormControl,
         Col, ControlLabel, Button} from 'react-bootstrap'
import { loginUser } from '../actions/user_actions'


const Login =  (props) => {

  const handleSubmit = () => {
    let inputArr = [],
        inputObj = {},
        inputs = document.getElementsByClassName('form-control')
    for(let i=0; i<inputs.length; i++){
        inputs[i].value ? inputArr.push(inputs[i].value) : null
    }

    if(inputs.length == 2){
      [inputObj.email, inputObj.pwHash] = [...inputArr]

      const email = encodeURIComponent(inputObj.email);
      const password = encodeURIComponent(inputObj.pwHash);
      const formData = `email=${email}&pwHash=${password}`;
      loginUser(formData)

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
