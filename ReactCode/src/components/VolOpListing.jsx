import React from 'react'
import { CardPanel } from 'react-materialize'

const VolOpListing = (props) => {
  return(
    <CardPanel className="white black-text">
      <div className='volop-listing-container'>
        <div className='volop-listing-header'>
          <div className='volop-orgname'>
            {props.orgName}
          </div>
          <div className='volop-name'>
            {props.volOpName}
          </div>
          <div className='volop-numspots'>
            {props.volOpSpotsAvailable}
          </div>
          <div className='volop-ongoing'>
            {props.volOpOngoing ?
              <b>Ongoing Opportunity</b>:
              <b>Single Event</b>}
          </div>
        </div>
        <div className='volop-description'>
          {props.volOpDescription}
        </div>
        <div className='volop-map-container'>
          <div className='volop-map'>
            <b>map goes here!</b>
          </div>
          <div className='volop-address'>
            {props.volOpAddress.state}
            {props.volOpAddress.city}
            {props.volOpAddress.street}
            {props.volOpAddress.zip}
          </div>
        </div>
        <div className='volop-footer'>
          <div className='volop-categories'>
            {props.volOpCategories.map(cat => {
              return(<b>{cat}</b>)
            })}
          </div>
          <div className='volop-details'>
            {props.volOpDetails.map(detail => {
              return(<b>{detail}</b>)
            })}
          </div>
        </div>
      </div>
		</CardPanel>
  )
}

export default VolOpListing
