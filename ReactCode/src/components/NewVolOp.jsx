import React from 'react'
import { Button, Row, Input } from 'react-materialize'
import { createVolop, editOrgInfo } from "../actions/org_actions";

export default class NewVolOp extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            categoryState: {
                animals: false,
                community: false,
                elderly: false,
                homeless: false,
                kids: false
            },
            ongoingState: false
        }

        this.handleRadioClicked = this.handleRadioClicked.bind(this)
        this.handleCategoryClicked = this.handleCategoryClicked.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleCategoryClicked(e){
        let categoryState = Object.assign({},this.state.categoryState)
        categoryState[e.target.value] = !categoryState[e.target.value]
        this.setState({categoryState})
    }

    handleRadioClicked(){
        let ongoingState = !this.state.ongoingState
        this.setState({ongoingState})
    }

    handleSubmit = () => {
        let inputArr = [],
            inputObj = {},
            inputs = document.getElementsByTagName('input')

        const orgObj = JSON.parse(localStorage.getItem('orgInfo'))

        for(let i=0; i<inputs.length; i++){
            inputs[i].value ? inputArr.push(inputs[i].value) : null
        }
        let currState = this.state.categoryState
        let categoriesSelected = []
        for(let category in currState){
            if(currState[category]){
                categoriesSelected.push(category)
            }
        }
        let details = []
        for(let i=11; i<14; i++){
            if(!inputArr[i].isEmpty){
                details.push(inputArr[i])
            }
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
            volOpOngoing: this.state.ongoingState,
            volOpStartDate: inputArr[7],
            volOpEndDate: inputArr[8],
            volOpTod: inputArr[9],
            volOpSpotsAvailable: inputArr[10],
            volOpDetails: details,
            volOpCategories: categoriesSelected,
            orgName: orgObj.orgName
        };
        createVolop(inputObj).then(result => {orgObj.orgVolOps.push(result._id);editOrgInfo(orgObj)})
        let loader = document.getElementById('loader-overlay')
        document.getElementById('loading-message').innerHTML ='Saving...'
        loader.style.visibility ='visible'
        setTimeout(() => {
            if(localStorage.getItem('volOpInfo')){
                loader.style.visibility ='hidden'
                this.props.history.push('/')
            } else {
                //add error message here
                loader.style.visibility ='hidden'
                console.log('Error creating volunteer opportunity')
            }
        }, 500)
    }

    render() {
        return (
            <div className='view-container'>
                <h2>New Volunteer Opportunity</h2>
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
                    <Input s={6} label="This Event is Ongoing" onClick={()=>this.handleRadioClicked()} type="checkbox"></Input>
                    <Row>
                        <Input s={6} label="Start Date" type="date"></Input>
                        <Input s={6} label="End Date" type="date"></Input>
                    </Row>
                    <Row>
                        <Input s={6} label="Time of Day"></Input>
                        <Input s={6} label="Spots Available" type="number"></Input>
                    </Row>
                    <Input s={12} label="Additional Details"></Input>
                    <Input s={12} label="Additional Details"></Input>
                    <Input s={12} label="Additional Details"></Input>
                    Categories
                    <Row>
                        <Input s={4} label="Animals" value='animals' onClick={(e)=>this.handleCategoryClicked(e)} type="checkbox"></Input>
                        <Input s={4} label="My Community" value='community' onClick={(e)=>this.handleCategoryClicked(e)} type="checkbox"></Input>
                        <Input s={4} label="The Elderly" value='elderly' onClick={(e)=>this.handleCategoryClicked(e)} type="checkbox"></Input>
                    </Row>
                    <Row>
                        <Input s={6} label="Homelessness" value='homeless' onClick={(e)=>this.handleCategoryClicked(e)} type="checkbox"></Input>
                        <Input s={6} label="Kids" value='kids' onClick={(e)=>this.handleCategoryClicked(e)} type="checkbox"></Input>
                    </Row>
                    <Button onClick={() => this.handleSubmit()}>Submit</Button>
                </div>
            </div>
        )
    }
}
