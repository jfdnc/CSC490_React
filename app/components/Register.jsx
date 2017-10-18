import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { Tabs, Tab, Form, ControlLabel,
         FormGroup, FormControl, Col } from 'react-bootstrap'

export default class Register extends React.Component {
  constructor(props){
    super(props)
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
              <Tab eventKey={1} title='User' id="user-reg-container">
                <Form horizontal>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>
                      First Name:
                    </Col>
                    <Col sm={8}>
                      <FormControl type='email' placeholder='First Name...'></FormControl>
                    </Col>
                    <Col componentClass={ControlLabel} sm={4}>
                      Last Name:
                    </Col>
                    <Col sm={8}>
                      <FormControl type='email' placeholder='Last Name...'></FormControl>
                    </Col>
                    <Col componentClass={ControlLabel} sm={4}>
                      ZIP Code:
                    </Col>
                    <Col sm={8}>
                      <FormControl type='email' placeholder='zip/postal code'></FormControl>
                    </Col>
                    <Col componentClass={ControlLabel} sm={4}>
                      E-mail:
                    </Col>
                    <Col sm={8}>
                      <FormControl type='email' placeholder='email@example.com'></FormControl>
                    </Col>
                    <Col componentClass={ControlLabel} sm={4}>
                      Password:
                    </Col>
                    <Col sm={8}>
                      <FormControl type='email' placeholder='Password'></FormControl>
                    </Col>
                    <Col componentClass={ControlLabel} sm={4}>
                      Confirm Password
                    </Col>
                    <Col sm={8}>
                      <FormControl type='email' placeholder='Password'></FormControl>
                    </Col>
                  </FormGroup>
                </Form>
              </Tab>
              <Tab eventKey={2} title='Organization'>
              <Col componentClass={ControlLabel} sm={4}>
                Name:
              </Col>
              <Col sm={8}>
                <FormControl type='email' placeholder='Organization Name'></FormControl>
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
                  <FormControl type='email' placeholder='(123) 555-6789'></FormControl>
                </Col>
                <Col componentClass={ControlLabel} sm={4}>
                  E-mail:
                </Col>
                <Col sm={8}>
                  <FormControl type='email' placeholder='email@example.com'></FormControl>
                </Col>
                <Col componentClass={ControlLabel} sm={4}>
                  Contact Name:
                </Col>
                <Col sm={8}>
                  <FormControl type='email' placeholder='Joe Helpful'></FormControl>
                </Col>
              </FormGroup>
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
