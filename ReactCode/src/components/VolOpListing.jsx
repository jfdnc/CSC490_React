import React from 'react'
import { CardPanel } from 'react-materialize'

const VolOpListing = (props) => {
  return(
    <CardPanel className="white black-text">
		  <h5>ID:{props._id}</h5>
      <h5>VolOpName:{props.volOpName}</h5>
      <h5>VolOpDescription:{props.volOpDescription}</h5>
		</CardPanel>
  )
}

export default VolOpListing
