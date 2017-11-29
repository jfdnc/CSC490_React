import React from 'react'
import { Button, Row, Input } from 'react-materialize'
import { updateVolOp } from "../actions/org_actions";

export default class EditVolOp extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            volOp: {},
            categoryState: {
                animals: false,
                community: false,
                elderly: false,
                homeless: false,
                kids: false
            },
            ongoingState: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleRadioClicked = this.handleRadioClicked.bind(this)
        this.handleCategoryClicked = this.handleCategoryClicked.bind(this)
    }

    componentWillMount(){
        const volOpInfo = JSON.parse(localStorage.getItem('volOpInfo'))
        this.setState({volOp: volOpInfo})

        //check if category checkboxes need to be 'checked' on load
        //prob better way to do this but oh well...
        let categories = volOpInfo.volOpCategories
        let categoriesChecked = {...this.state.categoryState}
        for(let i = 0; i<categories.length; i++){
            if(categories[i] === 'animals'){
                categoriesChecked.animals = true
            } else if(categories[i] === 'community'){
                categoriesChecked.community = true
            } else if(categories[i] === 'elderly'){
                categoriesChecked.elderly = true
            } else if(categories[i] === 'homeless'){
                categoriesChecked.homeless = true
            } else if(categories[i] === 'kids'){
                categoriesChecked.kids = true
            }
        }
        this.state.categoryState = categoriesChecked

        if(volOpInfo.volOpOngoing){
            this.state.ongoingState = true
        }
    }

    handleCategoryClicked(e){
        let categoryState = Object.assign({},this.state.categoryState)
        categoryState[e.target.value] = !categoryState[e.target.value]
        this.setState({categoryState})
    }

    handleRadioClicked(){
        let ongoingState = this.state.volOp.volOpOngoing
        if(ongoingState){
            ongoingState = false
        } else {
            ongoingState = true
        }
        this.setState({ongoingState})
    }

    handleSubmit(id){
        let inputArr = [],
            inputObj = {},
            inputs = document.getElementsByTagName('input')

        const orgObj = JSON.parse(localStorage.getItem('orgInfo'))

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value.length !== 0 ? inputArr.push(inputs[i].value) : inputArr.push('')
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
            details.push(inputArr[i])
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
            orgName: orgObj.orgName,
            _id: id
        };
        updateVolOp(inputObj)
        localStorage.removeItem('volOpInfo')
        window.location.reload()
    }

    handleCancel(){
        this.props.changeView('browse')
    }

    render() {
        const volOp = this.state.volOp
        return (
            <div className='view-container'>
                <h4>Edit Volunteer Opportunity</h4>
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
                    <Input s={6} label="This Event is Ongoing" type="checkbox" onClick={()=>this.handleRadioClicked()} defaultChecked={volOp.volOpOngoing}></Input>
                    <Row>
                        <Input s={6} label="Start Date (MM-DD-YYYY)" defaultValue={volOp.volOpStartDate}></Input>
                        <Input s={6} label="End Date (MM-DD-YYYY)" defaultValue={volOp.volOpEndDate}></Input>
                    </Row>
                    <Row>
                        <Input s={6} label="Time of Day" defaultValue={volOp.volOpTod}></Input>
                        <Input s={6} label="Spots Available" type="number" defaultValue={volOp.volOpSpotsAvailable}></Input>
                    </Row>
                    {volOp.volOpDetails.map(detail =>{
                        return (
                            <Input s={12} label="Additional Details" defaultValue={detail}></Input>
                        )
                    })}
                    Categories
                    <Row>
                        <Input s={4} label="Animals" value='animals' type="checkbox" onClick={(e)=>this.handleCategoryClicked(e)} defaultChecked={this.state.categoryState.animals}></Input>
                        <Input s={4} label="My Community" value='community' type="checkbox" onClick={(e)=>this.handleCategoryClicked(e)} defaultChecked={this.state.categoryState.community}></Input>
                        <Input s={4} label="The Elderly" value='elderly' type="checkbox" onClick={(e)=>this.handleCategoryClicked(e)} defaultChecked={this.state.categoryState.elderly}></Input>
                    </Row>
                    <Row>
                        <Input s={6} label="Homelessness" value='homeless' type="checkbox" onClick={(e)=>this.handleCategoryClicked(e)} defaultChecked={this.state.categoryState.homeless}></Input>
                        <Input s={6} label="Kids" value='kids' type="checkbox" onClick={(e)=>this.handleCategoryClicked(e)} defaultChecked={this.state.categoryState.kids}></Input>
                    </Row>
                    <Button onClick={() => this.handleSubmit(volOp._id)}>Submit</Button>
                    <Button onClick={() => this.handleCancel()}>Cancel</Button>
                </div>
            </div>
        )
    }
}