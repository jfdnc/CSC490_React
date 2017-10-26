import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { Tabs, Tab, Row, Input } from 'react-materialize'
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
            <Tabs className='reg-forms'>
              <Tab id='user-reg' title='user-reg' active>
              <Row>
                <Input s={6} label="First Name" />
                <Input s={6} label="Last Name" />
                <Input s={12} label="disabled" defaultValue="I am not editable" disabled />
                <Input type="password" label="password" s={12} />
                <Input type="email" label="Email" s={12} />
              </Row>
              </Tab>
              <Tab title='org-reg'>Test 2</Tab>

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
