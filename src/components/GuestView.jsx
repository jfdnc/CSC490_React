import React from 'react'
import CategoryCarousel from './CategoryCarousel'

export default class GuestView extends React.Component{
  render(){
    return(
      <div id='guest-view' className='view-container'>
        <h1>Guest Home View</h1>
        <CategoryCarousel />
        <CategoryCarousel />
        <CategoryCarousel />
        <CategoryCarousel />
        <CategoryCarousel />
        <CategoryCarousel />
      </div>
    )
  }
}
