import React from 'react'
import CategoryCarousel from './CategoryCarousel'
import { CSSTransition } from 'react-transition-group'
import { Button } from 'react-bootstrap'
import { displayRegister, displayLogin } from '../actions/actions/display_actions'

export default class GuestView extends React.Component{
  render(){
    return(
      <CSSTransition
        in={true}
        appear={true}
        enter={true}
        classNames="fade"
        timeout={300}>
        <div id='guest-view' className='view-container'>
          <div id='guest-left'>
            <Button bsSize='large' onClick={displayRegister}>Register</Button>
            <Button bsSize='large' onClick={displayLogin}>Log In</Button>
          </div>
          <div id='guest-right'>
            <CategoryCarousel />
          </div>
        </div>
      </CSSTransition>
    )
  }
}
