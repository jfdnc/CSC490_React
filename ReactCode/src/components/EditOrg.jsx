import React from 'react'
import { Button, Row, Input } from 'react-materialize'
import {editOrgInfo} from "../actions/org_actions";

export default class EditOrg extends React.Component {
    constructor(props){
        super(props)

        this.state = { org: {} }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        const orgInfo = JSON.parse(localStorage.getItem('orgInfo'))
        this.setState({org: orgInfo})
    }

    handleSubmit = () =>{
        let inputArr = [],
            inputObj = {},
            inputs = document.getElementsByTagName('input')
        for(let i=0; i<inputs.length; i++){
            inputs[i].value ? inputArr.push(inputs[i].value) : null
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
            _id: this.state.org._id
        };

        editOrgInfo(inputObj).then(this.props.history.push('/'))

    }

    render(){
        return(
            <div>
                <div id='register-view' className='view-container'>
                    <Row>
                        <Input s={6} label="Org Name" defaultValue={this.state.org.orgName}></Input>
                        <Input s={6} label="Org Email" type='email' validate defaultValue={this.state.org.orgEmail}></Input>
                    </Row>
                    <Row>
                        <Input s={6} label="Street" defaultValue={this.state.org.orgAddress.street}></Input>
                        <Input s={6} label="City" defaultValue={this.state.org.orgAddress.city}></Input>
                    </Row>
                    <Row>
                        <Input s={6} label="State" defaultValue={this.state.org.orgAddress.state}></Input>
                        <Input s={6} label="Zip" defaultValue={this.state.org.orgAddress.zip}></Input>
                    </Row>
                    <Input s={12} label="Description" defaultValue={this.state.org.orgDescription}></Input>
                    <Row>
                        <Input s={6} label="Phone" defaultValue={this.state.org.orgPhone}></Input>
                        <Input s={6} label="Website" defaultValue={this.state.org.orgWebsite}></Input>
                    </Row>
                    <Input s={12} label="Contact Name" type='text' defaultValue={this.state.org.orgContactPerson}></Input>
                    <Button onClick={() => this.handleSubmit()}>Submit</Button>
                </div>
            </div>
        )
    }
}