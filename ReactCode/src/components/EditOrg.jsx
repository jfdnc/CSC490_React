import React from 'react'
import { Button, Row, Input } from 'react-materialize'
import {editOrgInfo} from "../actions/org_actions";

export default class EditOrg extends React.Component {
    constructor(props){
        super(props)

        this.state = { ...props }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleSubmit = () =>{
        let inputArr = [],
            inputObj = {},
            inputs = document.getElementsByTagName('input')
        for(let i=0; i<inputs.length; i++){
            inputs[i].value.length !== 0 ? inputArr.push(inputs[i].value) : inputArr.push('')
        }
        inputObj = {
            orgName: inputArr[0],
            orgEmail: inputArr[1],
            orgAddress: {
                street: inputArr[2],
                city: inputArr[3],
                state: inputArr[4],
                zip: inputArr[5]
            },
            orgDescription: inputArr[6],
            orgPhone: inputArr[7],
            orgWebsite: inputArr[8],
            orgContactPerson: inputArr[9],
            _id: this.state._id
        };
        editOrgInfo(inputObj).then(result => {localStorage.setItem('orgInfo', JSON.stringify(result)); window.location.reload()})
    }

    handleCancel(){
        this.props.changeView('browse')
    }

    render(){
        return(
            <div>
                <div id='edit-org-view' className='view-container'>
                    <Row>
                        <Input s={6} label="Org Name" defaultValue={this.state.orgName}></Input>
                        <Input s={6} label="Org Email" type='email' validate defaultValue={this.state.orgEmail}></Input>
                    </Row>
                    <Row>
                        <Input s={6} label="Street" defaultValue={this.state.orgAddress.street}></Input>
                        <Input s={6} label="City" defaultValue={this.state.orgAddress.city}></Input>
                    </Row>
                    <Row>
                        <Input s={6} label="State" defaultValue={this.state.orgAddress.state}></Input>
                        <Input s={6} label="Zip" defaultValue={this.state.orgAddress.zip}></Input>
                    </Row>
                    <Input s={12} label="Description" defaultValue={this.state.orgDescription}></Input>
                    <Row>
                        <Input s={6} label="Phone" defaultValue={this.state.orgPhone}></Input>
                        <Input s={6} label="Website" defaultValue={this.state.orgWebsite}></Input>
                    </Row>
                    <Input s={12} label="Contact Name" type='text' defaultValue={this.state.orgContactPerson}></Input>
                    <div id='org-form-buttons'>
                      <Button onClick={() => this.handleSubmit()}>Submit</Button>
                      <Button onClick={() => this.handleCancel()}>Cancel</Button>
                    </div>
                </div>
            </div>
        )
    }
}
