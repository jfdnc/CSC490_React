import React from 'react'
import { CardPanel, Button, Icon } from 'react-materialize'
import { deleteVolOp, getVolOpById } from '../actions/org_actions'
import { withRouter } from 'react-router-dom'


const VolOpListingOrg = (props) => {
    const handleEdit = () =>{
        getVolOpById(props._id).then(props.history.push('/editvolop'))
    }

    const handleDelete = () => {
        deleteVolOp(props._id).then(props.history.push('/'))
    }

    return(
        <CardPanel className="white black-text">
            <div>ID:{props._id}</div>
            <div>VolOpName:{props.volOpName}</div>
            <div>VolOpDescription:{props.volOpDescription}</div>
            <div><Button onClick={()=>handleEdit()}>Edit<Icon right>edit</Icon></Button>    <Button onClick={()=>handleDelete()}>Delete<Icon right>delete</Icon></Button></div>
        </CardPanel>
    )
}

export default withRouter(VolOpListingOrg)