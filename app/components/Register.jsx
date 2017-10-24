import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { Tabs, Tab, Form, ControlLabel,
         FormGroup, FormControl, Col, Button } from 'react-bootstrap'
import { displayHome } from '../actions/actions/display_actions'
import { createUser } from '../actions/actions/user_actions'

export default class Register extends React.Component {
  constructor(props){
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    var inputArr = [],
        inputObj = {},
        inputs = document.getElementsByClassName('form-control')
    for(let i=0; i<inputs.length; i++){
      inputs[i].value ? inputArr.push(inputs[i].value) : null
    }
    if(inputArr.length == 6){
      inputObj = {
        fName: inputArr[0],
        lName: inputArr[1],
        zip: inputArr[2],
        eMail: inputArr[3],
        pw: inputArr[4]
      }
      //console.log(inputObj)
      createUser(inputObj)
      displayHome()
    } else if(inputArr.length == 5){
      inputObj = {
        orgName: inputArr[0],
        description: inputArr[1],
        phone: inputArr[2],
        eMail: inputArr[3],
        contactName: inputArr[4]
      }
      console.log(inputObj)
      displayHome()
    } else {
      console.log('enter values in all fields!')
    }
  }

  render(){
    return(
      <CSSTransition
        in={true}
        appear={true}
        enter={true}
        classNames="fade"
        timeout={300}>
        <div id='register-view' className='view-container'>
          <div id='onsite'>
            <Tabs defaultActiveKey={1} id='registration-tabs'>
              {/*user fields*/}
              <Tab eventKey={1} title='User' >
                <Form horizontal onSubmit={this.handleSubmit} >
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>
                      First Name:
                    </Col>
                    <Col sm={8}>
                      <FormControl placeholder='First Name...'></FormControl>
                    </Col>
                    <Col componentClass={ControlLabel} sm={4}>
                      Last Name:
                    </Col>
                    <Col sm={8}>
                      <FormControl placeholder='Last Name...'></FormControl>
                    </Col>
                    <Col componentClass={ControlLabel} sm={4}>
                      ZIP Code:
                    </Col>
                    <Col sm={8}>
                      <FormControl placeholder='zip/postal code'></FormControl>
                    </Col>
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
                    <Col componentClass={ControlLabel} sm={4}>
                      Confirm Password
                    </Col>
                    <Col sm={8}>
                      <FormControl placeholder='Password'></FormControl>
                    </Col>
                  </FormGroup>
                  <Button type='submit' bsStyle='primary'>Submit</Button>
                </Form>
              </Tab>
              {/*org fields*/}
              <Tab eventKey={2} title='Organization'>
              <Form onSubmit={this.handleSubmit}>
              <FormGroup>
              <Col componentClass={ControlLabel} sm={4}>
                Name:
              </Col>
              <Col sm={8}>
                <FormControl placeholder='Organization Name'></FormControl>
              </Col>
              <FormGroup controlId="formControlsTextarea">
                <Col sm={4}>
                  <ControlLabel>Organization Description</ControlLabel>
                </Col>
                <Col sm={8}>
                  <FormControl componentClass="textarea" placeholder="..." />
                </Col>
                <Col componentClass={ControlLabel} sm={4}>
                  Phone:
                </Col>
                <Col sm={8}>
                  <FormControl placeholder='(123) 555-6789'></FormControl>
                </Col>
                <Col componentClass={ControlLabel} sm={4}>
                  E-mail:
                </Col>
                <Col sm={8}>
                  <FormControl placeholder='email@example.com'></FormControl>
                </Col>
                <Col componentClass={ControlLabel} sm={4}>
                  Contact Name:
                </Col>
                <Col sm={8}>
                  <FormControl placeholder='Joe Helpful'></FormControl>
                </Col>
              </FormGroup>
              <Button type='submit' bsStyle='primary'>Submit</Button>
              </FormGroup>

              </Form>
              </Tab>
            </Tabs>
          </div>
          <div id='offsite'>
            offsite registration
          </div>
        </div>
      </CSSTransition>
    )
  }
}
