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
    let proparr = []
    for(var property in this.state.userState){
      if(this.state.userState.hasOwnProperty(property)){
        proparr.push({propName:property,propContent:this.state.userState[property]})
      }
    }
    return(
      <div id='main-container'>
        <div id="content-container">
          {proparr.map((prop,i) => <div key={i}>{prop.propName}:{prop.propContent}</div>)}
        </div>
      </div>
    )
  }
}
