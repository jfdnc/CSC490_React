import React from 'react'
import { Button, Row, Input } from 'react-materialize'
import { createVolop } from "../actions/org_actions";

const NewVolOp = (props) => {
    const handleSubmit = () => {
        let inputArr = [],
            inputObj = {},
            inputs = document.getElementsByTagName('input')
        for(let i=0; i<inputs.length; i++){
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
            volOpCategories: inputArr[12]
        };

        createVolop(inputObj)
    }

    return(
        <div className='view-container'>
            <h1>NewVolOp</h1>
            <div id='newvolop'>
                <Input s={6} label="Name"></Input>
                <Input s={6} label="Description" type="text"></Input>
                <Row>
                    <Input s={6} label="Street"></Input>
                    <Input s={6} label="City"></Input>
                </Row>
                <Row>
                    <Input s={6} label="State"></Input>
                    <Input s={6} label="Zip"></Input>
                </Row>
                <Input s={6} label="This Event is Ongoing" type="checkbox"></Input>
                <Row>
                    <Input s={6} label="Start Date" type="date"></Input>
                    <Input s={6} label="End Date" type="date"></Input>
                </Row>
                <Row>
                    <Input s={6} label="Time of Day"></Input>
                    <Input s={6} label="Spots Available" type="number"></Input>
                </Row>
                <Input s={12} label="Details"></Input>
                <Input s={12} label="Categories"></Input>
                <Button onClick={()=>handleSubmit()}>Submit</Button>
            </div>
        </div>
    )
}

export default NewVolOp