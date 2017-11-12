import React from 'react'
import { Button, Row, Input } from 'react-materialize'
import { updateVolOp } from "../actions/org_actions";
import { withRouter } from 'react-router-dom'

const EditVolOp = (props) => {
    const handleSubmit = (id) => {
        let inputArr = [],
            inputObj = {},
            inputs = document.getElementsByTagName('input')

        const orgObj = JSON.parse(localStorage.getItem('orgInfo'))

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value ? inputArr.push(inputs[i].value) : null
        }
        inputObj = {
            volOpName: inputArr[0],
            volOpDescription: inputArr[1],
            volOpAddress: {
                street: inputArr[2],
                city: inputArr[3],
                state: inputArr[4],
                zip: inputArr[5]
            },
            volOpOngoing: inputArr[6],
            volOpStartDate: inputArr[7],
            volOpEndDate: inputArr[8],
            volOpTod: inputArr[9],
            volOpSpotsAvailable: inputArr[10],
            volOpDetails: inputArr[11],
            volOpCategories: inputArr[12],
            orgName: orgObj.orgName,
            _id: id
        };
        updateVolOp(inputObj).then(this.props.history.push('/'))
    }

    let volOp = JSON.parse(localStorage.getItem('volOpInfo'))
    return (
        <div className='view-container'>
            <h1>EditVolOp</h1>
            <div id='editvolop'>
                <Input s={6} label="Name" defaultValue={volOp.volOpName}></Input>
                <Input s={6} label="Description" type="text" defaultValue={volOp.volOpDescription}></Input>
                <Row>
                    <Input s={6} label="Street" defaultValue={volOp.volOpAddress.street}></Input>
                    <Input s={6} label="City" defaultValue={volOp.volOpAddress.city}></Input>
                </Row>
                <Row>
                    <Input s={6} label="State" defaultValue={volOp.volOpAddress.state}></Input>
                    <Input s={6} label="Zip" defaultValue={volOp.volOpAddress.zip}></Input>
                </Row>
                <Input s={6} label="This Event is Ongoing" type="checkbox" defaultValue={volOp.volOpOngoing}></Input>
                <Row>
                    <Input s={6} label="Start Date" type="date" defaultValue={volOp.volOpStartDate}></Input>
                    <Input s={6} label="End Date" type="date" defaultValue={volOp.volOpEndDate}></Input>
                </Row>
                <Row>
                    <Input s={6} label="Time of Day" defaultValue={volOp.volOpTod}></Input>
                    <Input s={6} label="Spots Available" type="number" defaultValue={volOp.volOpSpotsAvailable}></Input>
                </Row>
                <Input s={12} label="Details" defaultValue={volOp.volOpDetails}></Input>
                <Input s={12} label="Categories" defaultValue={volOp.volOpCategories}></Input>
                <Button onClick={() => handleSubmit(volOp._id)}>Submit</Button>
            </div>
        </div>
    )
}

export default withRouter(EditVolOp)