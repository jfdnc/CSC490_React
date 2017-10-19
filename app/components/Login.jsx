import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { Form, FormGroup, FormControl,
         Col, ControlLabel, Button} from 'react-bootstrap'

export default class Login extends React.Component {
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
        <div id='login-view' className='view-container'>
        <div id='onsite'>
          <Form horizontal onSubmit={this.handleSubmit} >
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
      </CSSTransition>
    )
  }
}
