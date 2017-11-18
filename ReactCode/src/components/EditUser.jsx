import React from 'react'
import { Button, Row, Input } from 'react-materialize'
import UserStore from '../data/stores/UserStore'
import { editPrefs,addToCal} from '../actions/user_actions'
import _ from 'lodash'

export default class EditUser extends React.Component {
    constructor(props){
        super(props)

        this.state = UserStore.getAll().user


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
            this.props.history.push('/')
          } else {
            //add error message here
            loader.style.visibility ='hidden'
            console.log('Error updating user info')
          }
        }, 500)

    }




    render(){
        
        for(var i =0;i<UserStore.getvolOps().length;i++){
        console.log(JSON.stringify(UserStore.getvolOps()[i])+" in for edit user")
       }
        var volops = UserStore.getvolOps()
        var VolOpComponents
        if(volops.length!=0){

        //used to control background color
        var x = 0
        var emailText = "Email Reminder"
        VolOpComponents = volops.map((volop) =>{
            x++
            var myColor
            if(x%2==0){
                //myColor='#ff0000' use to alternate colors
                myColor='#00ff00' 
            }else{
               myColor='#00ff00' 
            }
            return (
                <div className = {"volOpColor"+(x%2)}>
                <h2 style={{color: myColor}}>{volop.volOpName}</h2>
                <h3>{volop.volOpStartDate}</h3>
                <h3>{volops.volOpEndDate}</h3>
                <h3>{volop.volOpTod}</h3>
                <Button onClick={()=>{

                    addToCal(volop._id, this.state.email)

                }}>{emailText}</Button> 
                <Button onClick={()=>{

                    console.log('delete goes here')
                    //emailText = "Done!"


                }}>Delete</Button>
                </div>
                )
        })
        //document.getElementById("volOpColor0").style.backgroundColor = "LightGray";
        //document.getElementById("volOpColor1").style.backgroundColor = "LightSteelBlue ";
     } else{
            VolOpComponents = <h2>You do not have any volunteer opportunities to show</h2>
     }
        return(
            <div>
                <div id='edit-user-view' className='view-container'>
                <h1>Edit Profile</h1>
                    <div>
                    <Row>
                        <Input s={6} label="First Name" defaultValue={this.state.firstName}></Input>
                        <Input s={6} label="Last Name" defaultValue={this.state.lastName}></Input>
                        <Input s={6} label="Email" type='email' validate defaultValue={this.state.email}></Input>
                        <Input s={6} label="Zip" defaultValue={this.state.zipCode}></Input>
                    </Row>                    
                    <Button onClick={() => this.handleSubmit()}>Submit Changes</Button>
                    </div>
                    <div id='view volOps'>
                    <hr></hr>
                    <h1>Volunteer Activities</h1>
                    <ul>{VolOpComponents}</ul>
                    </div>
                    </div>                
                </div>
        )
    }
}
