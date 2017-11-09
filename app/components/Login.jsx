import React from 'react'
import Fade from './Fade'
import { updateDisplayUserType } from '../actions/display_actions'
import { Form, FormGroup, FormControl,
         Col, ControlLabel, Button} from 'react-bootstrap'
import * as UserActions from '../actions/user_actions'
import * as UserStore from '../data/stores/UserStore'


const Login =  (props) => {

  const handleSubmit = () => {
    let inputs = document.getElementsByClassName('form-control')

    if(inputs.length == 2){
      let [email, pw] = [...inputs]

      /*****************************/
      //just for testing, NOT how this will be actually implemented
      //this will 'log in' for UI purposes before we have auth0 and all that
      //stuff set up
      if(email.value == 'user'){
        updateDisplayUserType('user')
      } else if (email.value == 'org'){
        updateDisplayUserType('org')
      }
      /****************************/

      //do sanity checking here and then submit to user and org store
      //console.log(email.value, pw.value)
    } else {
      console.log('must provide email and pw')
    }
  }

 function check(e) {
    e.preventDefault()    
    this.initState()    
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
          <div>
          <a href="/auth2/facebook" class="btn btn-primary" onClick={()=>{UserActions.initState()}}><span class="fa fa-facebook"></span> Facebook</a>
          <input type="submit" value="myTest" className="btn" onClick={() => {UserActions.initState()}}/>
          </div>      
      </div>

      </div>
    </Fade>
    )
}

export default Login
