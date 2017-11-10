import React from 'react'
import { CardPanel } from 'react-materialize'

const VolOpListing = (props) => {
  return(
    <CardPanel className="white black-text">
		  <div>ID:{props._id}</div>
      <div>VolOpName:{props.volOpName}</div>
      <div>VolOpDescription:{props.volOpDescription}</div>
		</CardPanel>
  )
}

export default VolOpListing
