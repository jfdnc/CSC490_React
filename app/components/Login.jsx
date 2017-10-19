import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { Form, FormGroup, FormControl,
         Col, ControlLabel, Button} from 'react-bootstrap'

export default class Login extends React.Component {
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

    inputObj = {
      email: inputArr[0],
      pw: inputArr[1]
    }

    console.log(inputObj)
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
