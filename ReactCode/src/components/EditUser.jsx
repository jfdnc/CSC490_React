import React from 'react'
import { Button, Row, Input } from 'react-materialize'
import UserStore from '../data/stores/UserStore'
import { editPrefs} from '../actions/user_actions'

export default class EditOrg extends React.Component {
    constructor(props){
        super(props)

        this.state = {...props}


        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = () =>{
        let inputArr = [],
            inputObj = {},
            inputs = document.getElementsByTagName('input')
        for(let i=0; i<inputs.length; i++){
            inputs[i].value ? inputArr.push(inputs[i].value) : null
        }
        var j = 0
        inputObj = {
            firstName: inputArr[j++],
            lastName: inputArr[j++],
            email: inputArr[j++],
            zipCode: inputArr[j++],
            _id: this.state._id
        };

        editPrefs(inputObj)
        let loader = document.getElementById('loader-overlay')
        document.getElementById('loading-message').innerHTML ='Saving...'
        loader.style.visibility ='visible'
        setTimeout(() => {
          if(localStorage.getItem('userInfo')){
            loader.style.visibility ='hidden'
            window.location.reload()
          } else {
            //add error message here
            loader.style.visibility ='hidden'
            console.log('Error updating User info')
          }
        }, 500)

    }

    render(){
        return(
            <div>
                <div id='edit-user-view' className='view-container'>
                    <Row>
                        <Input s={6} label="First Name" defaultValue={this.state.firstName}></Input>
                        <Input s={6} label="Last Name" defaultValue={this.state.lastName}></Input>
                        <Input s={6} label="Email" type='email' validate defaultValue={this.state.email}></Input>
                        <Input s={6} label="Zip" defaultValue={this.state.zipCode}></Input>
                    </Row>
                    <Button onClick={() => this.handleSubmit()}>Submit</Button>
                </div>
            </div>
        )
    }
}
