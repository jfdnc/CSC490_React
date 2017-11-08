import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import UserStore from '../data/stores/UserStore'

export default class MainView extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      userState: {},
    }
  }

  componentWillMount(){
    this.setState({userState:UserStore.getAll().user})

    UserStore.on('change', () => {
      this.setState({userState:UserStore.getAll().user})
    })
  }

  render(){
    console.log(this.state)
    return(
      <div id='main-container'>
        <div id="content-container">
          fucku
        </div>
      </div>
    )
  }
}
