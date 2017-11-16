import React from 'react'
import { CardPanel, Button, Icon } from 'react-materialize'
import { deleteVolOp, getVolOpById, editOrgInfo } from '../actions/org_actions'
import { withRouter } from 'react-router-dom'
import ReactToolTip from 'react-tooltip'
import gmappalceholder from '../assets/images/gmapplaceholder.jpg'

const VolOpListingOrg = (props) => {
  console.log(props)
    var icons = {
        animals:<Icon>pets</Icon>,
        community:<Icon>domain</Icon>,
        elderly:<Icon>accessible</Icon>,
        homeless:<Icon>wc</Icon>,
        kids:<Icon>face</Icon>
    }

    const handleEdit = () =>{
        getVolOpById(props._id).then(props.history.push('/editvolop')).catch(function(err){console.log(err)})
    }

    const handleDelete = () => {
        const orgObj = JSON.parse(localStorage.getItem('orgInfo'))
        deleteVolOp(props._id)
            .then(result => {orgObj.orgVolOps.splice(orgObj.orgVolOps.indexOf(result._id), 1);editOrgInfo(orgObj)
                .then(props.history.push('/'))
                .catch(function(err){console.log(err)})})
            .catch(function(err){console.log(err)})
    }

    return(
        <CardPanel className="white black-text">
            <h6>{props.orgName}</h6>
            <div><Button onClick={()=>handleEdit()}>Edit<Icon right>edit</Icon></Button>    <Button onClick={()=>handleDelete()}>Delete<Icon right>delete</Icon></Button></div>
        </CardPanel>
    )
}

export default withRouter(VolOpListingOrg)
