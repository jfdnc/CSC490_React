import React from 'react'
import { CardPanel, Icon, Button } from 'react-materialize'
import ReactToolTip from 'react-tooltip'
import gmappalceholder from '../assets/images/gmapplaceholder.jpg'

const VolOpListing = (props) => {
  var icons = {
    animals:<Icon>pets</Icon>,
    community:<Icon>domain</Icon>,
    elderly:<Icon>accessible</Icon>,
    homeless:<Icon>wc</Icon>,
    kids:<Icon>face</Icon>
  }
  var userType = props.userType

  console.log(userType)
  return(
    <CardPanel className="white black-text">
      <div className='volop-listing-container'>
        <div className='volop-orgname'>
          <b>{props.orgName}</b>
        </div>
        <div className='volop-name'>
          {props.volOpName}
        </div>
        <div className='volop-numspots-icon'>
          <div data-tip={`${props.volOpSpotsAvailable} Spots Remaining`}>
            <Icon>account_box</Icon>
          </div>
        </div>
        <ReactToolTip class='tooltip'/>
        <div className='volop-numspots-num'>
            <div>{props.volOpSpotsAvailable}</div>
        </div>
          <div className='volop-ongoing'>
            {props.volOpOngoing ?
              <b>Ongoing</b>:
              <div>
              <b data-tip={
                `${props.volOpStartDate == props.volOpEndDate ?
                                props.volOpStartDate :
                                `${props.volOpStartDate} to ${props.volOpEndDate}` } from ${props.volOpTod}`}>One-Time Event</b>
              <ReactToolTip class='tooltip'/>
              </div>
            }
            <hr/>
          </div>
        <div className='volop-description'>
          {props.volOpDescription}
        </div>
        <div className='volop-map'>
          <img src={gmappalceholder}/>
        </div>
        <div className='volop-address'>
          {/*`${props.volOpAddress.city}, ${props.volOpAddress.state}, ${props.volOpAddress.street}, ${props.volOpAddress.zip}`*/}
        </div>
        <div className='volop-categories'>
          <ul>
          {props.volOpCategories.map(cat => {
              return(
                <li data-tip={cat}
                    style={{display:'inline'}}>
                    {icons[cat]}
                    <ReactToolTip class='tooltip'/>
                </li>)
            })
          }
          </ul>
        </div>
        <div className='volop-details'>
          <ul>
          {props.volOpDetails.map(detail => {
            return(<li>{detail}</li>)
          })}
          </ul>
        </div>
        <div className='volop-save-button'>
          <Button>{props.userType == 'guest' ? 'Log In and Save' : 'Save'}</Button>
        </div>
      </div>
		</CardPanel>
  )
}

export default VolOpListing
