import React from 'react'
import CategoryCarousel from './CategoryCarousel'
import Fade from './Fade'
import { Button } from 'react-bootstrap'
import { displayRegister, displayLogin } from '../actions/display_actions'

const GuestView = (props) => {
    return(
      <Fade>
        <div id='guest-view' className='view-container'>
          <div id='guest-left'>
            <Button bsSize='large' onClick={displayRegister}>Register</Button>
            <Button bsSize='large' onClick={displayLogin}>Log In</Button>
          </div>
          <div id='guest-right'>
            <CategoryCarousel />
          </div>
        </div>
      </Fade>
    )
}

export default GuestView
