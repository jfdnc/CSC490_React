import React from 'react'
import CategoryCarousel from './CategoryCarousel.jsx'
import VolOpStore from '../data/VolOpStore'
//importing actions to send actions to dispatcher
import * as TestActions from '../actions/TestActions'

export default class MainContent extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      name: "John"
    }

}

componentWillMount(){
    VolOpStore.on("change", () => {
      this.setState({
        name: VolOpStore.getName()
      })
    })
  }

  render(){
    return(
      <div id="main-content-wrap">
        <div className="main-content">
          <CategoryCarousel />
        </div>
        <div className="main-content">
          <h1>{this.state.name}</h1>
        </div>
        <div className="main-content">
          <h1>And also here!</h1>
        </div>
      </div>

    )
  }
}
