import React from 'react'
import { CardPanel, Button, Icon } from 'react-materialize'


const VolOpListingOrg = (props) => {
    return(
        <CardPanel className="white black-text">
            <div>ID:{props._id}</div>
            <div>VolOpName:{props.volOpName}</div>
            <div>VolOpDescription:{props.volOpDescription}</div>
            <div><Button waves="light">Edit<Icon right>edit</Icon></Button>    <Button waves="light">Delete<Icon right>delete</Icon></Button></div>
        </CardPanel>
    )
}

export default VolOpListingOrg