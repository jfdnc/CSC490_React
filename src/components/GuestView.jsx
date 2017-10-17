import React from 'react'
import CategoryCarousel from './CategoryCarousel'
import { CSSTransition } from 'react-transition-group'

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
          <h1>Guest Home View</h1>
          <CategoryCarousel />
        </div>
      </CSSTransition>
    )
  }
}
