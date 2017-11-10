import React from 'react'

export default class Dashboard extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      type: props.type
    }

  }

  render(){
    return(
      <div className='dashboard-container' id={`dashboard-${this.state.type}`}>
        {this.state.type}
      </div>
    )
  }
}
