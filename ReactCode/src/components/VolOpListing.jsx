import React from 'react'
import { CardPanel } from 'react-materialize'

const VolOpListing = (props) => {
  return(
    <CardPanel className="white black-text">
      <div className='volop-listing-container'>
        <div className='volop-listing-header'>
          <div className='volop-orgname'>
          </div>
          <div className='volop-name'>
          </div>
          <div className='volop-numspots'>
          </div>
          <div className='volop-ongoing'>
          </div>
        </div>
        <div className='volop-description'>
        </div>
        <div className='volop-map-container'>
          <div className='volop-map'>
          </div>
          <div className='volop-address'>
          </div>
        </div>
        <div className='volop-footer'>
          <div className='volop-categories'>
          </div>
          <div className='volop-details'>
          </div>
        </div>
      </div>
		</CardPanel>
  )
}

export default VolOpListing
