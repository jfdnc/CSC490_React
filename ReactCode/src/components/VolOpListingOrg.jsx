import React from 'react'
import { CardPanel, Button, Icon, Preloader } from 'react-materialize'
import { deleteVolOp, getVolOpById, editOrgInfo } from '../actions/org_actions'
import ReactToolTip from 'react-tooltip'

const VolOpListingOrg = (props) => {
    var icons = {
        animals:<Icon>pets</Icon>,
        community:<Icon>domain</Icon>,
        elderly:<Icon>accessible</Icon>,
        homeless:<Icon>wc</Icon>,
        kids:<Icon>face</Icon>
    }

    const handleEdit = () =>{
        localStorage.setItem('volOpInfo', JSON.stringify(props))
        props.populateEditVolOp()
        props.changeView('edit')
    }

    const handleDelete = (id) => {
        const orgObj = JSON.parse(localStorage.getItem('orgInfo'))
        deleteVolOp(props._id)
            .then(result => {
              orgObj.orgVolOps.splice(orgObj.orgVolOps.indexOf(result._id), 1)
              editOrgInfo(orgObj).then(result => {localStorage.setItem('orgInfo', JSON.stringify(result))})
            })
                .then(() => {
                  document.getElementById(`delete-button-${id}`).style.visibility = 'hidden'
                  document.getElementById(`delete-spinner-${id}`).style.visibility = 'visible'
                  setTimeout(() => {
                  window.location.reload()
                }, 1000)
              })
    }

    const populateDate = () => {
        if(props.volOpOngoing){
            return(
                <div className='date-range'>
                    Ongoing
                </div>
            )
        } else {
            return(
                <div className='date-range'>
                    {props.volOpStartDate} to {props.volOpEndDate}
                </div>
            )
        }
    }

    return(
        <CardPanel className="white black-text">
          <div className="org-volop-listing-container">
            <div className='org-listing-name'>
              {props.volOpName}
            </div>
            <div className='org-listing-description'>
              {props.volOpDescription}
            </div>
            <div className='org-listing-datetime'>
                {populateDate()}
              <div className='time-range'>
                {props.volOpTod}
              </div>
            </div>
            <div className='org-listing-spots'>
              {props.volOpSpotsAvailable} Spots Remaining
            </div>
            <div className='org-listing-categories'>
              {props.volOpCategories.map(cat => {
                return(
                <li data-tip={cat}
                    style={{display:'inline'}}>
                    {icons[cat]}
                    <ReactToolTip class='tooltip'/>
                </li>
                )
              })}
            </div>
            <div className='org-listing-details'>
            <ul>
              {props.volOpDetails.map(det => <li>{det}</li>)}
            </ul>
            </div>
            <div className='org-listing-address'>
              {props.volOpAddress.street}, {props.volOpAddress.city}, {props.volOpAddress.state}, {props.volOpAddress.zip}
            </div>
            <div className='org-listing-edit'>
            <a data-tip='Edit VolOp Info' onClick={()=>handleEdit()}><Icon right>edit</Icon>
            <ReactToolTip class='tooltip'/>
            </a>
            </div>
            <div data-tip='Delete VolOp' className='org-listing-delete'>
            <div style={{visibility: 'hidden'}} className='delete-spinner' id={`delete-spinner-${props._id}`}>
              <Preloader size='small'/>
            </div>
            <div className='delete-button' id={`delete-button-${props._id}`}>
              <a onClick={()=>handleDelete(props._id)}><Icon right>delete</Icon>
              <ReactToolTip class='tooltip'/>
            </a>
            </div>
            </div>
          </div>
        </CardPanel>
    )
}

export default VolOpListingOrg
