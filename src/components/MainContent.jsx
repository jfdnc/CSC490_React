import React from 'react'
import CategoryCarousel from './CategoryCarousel.jsx'

export default class MainContent extends React.Component{
  constructor(props){
    super(props)

}



  render(){
    return(
      <div id="main-content-wrap">
        <div className="main-content">
          <CategoryCarousel />
        </div>
        <div className="main-content">
          <h1>Cool things happening here!</h1>
        </div>
        <div className="main-content">
          <h1>And also here!</h1>
        </div>
      </div>

    )
  }
}
