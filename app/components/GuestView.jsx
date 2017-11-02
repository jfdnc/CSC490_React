import React from 'react'
import Fade from './Fade'
import { Button } from 'react-bootstrap'
import { displayRegister, displayLogin } from '../actions/display_actions'

const GuestView = (props) => {
    return(
      <Fade>
        <div id='guest-view' className='view-container'>
          <div id='guest-left'>
            Category Carousel
          </div>
          <div id='guest-right'>
            Project Information
          </div>
        </div>
      </Fade>
    )
}

export default GuestView
