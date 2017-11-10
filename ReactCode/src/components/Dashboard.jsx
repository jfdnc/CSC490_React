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
      <div id='dashboard-container'>
        {this.state.type}
      </div>
    )
  }
}
