import React from 'react'
import Fade from './Fade'
import { Button, Carousel } from 'react-bootstrap'
import Dashboard from './Dashboard'
import volimg1 from '../assets/images/vol1.JPG'

const GuestView = (props) => {
    return(
      <Fade>
        <div id='guest-view' className='view-container'>
          <div id='splash-container'>
            <img className='splash-img' src={volimg1}/>
          </div>
          <Dashboard type='guest' />
        </div>
      </Fade>
    )
}

export default GuestView
