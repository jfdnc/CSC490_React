import React from 'react'
import Menu from './Menu'
import UserStore from '../data/stores/UserStore.js'
import OrgStore from '../data/stores/OrgStore.js'
import { Button } from 'react-materialize'
import { logOut } from '../actions/user_actions'

export default class Homepage extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      userStoreState: {},
      orgStoreState: {}
    }

  }

  componentWillMount(){
    let initUserState = UserStore.getAll()
    let initOrgState = OrgStore.getAll()

    this.setState({
      userStoreState: initUserState,
      orgStoreState: initOrgState
    })

    UserStore.on('change', () => {
      this.setState({userStoreState: UserStore.getAll()})
    })

    OrgStore.on('change', () => {
      this.setState({orgStoreState: OrgStore.getAll()})
    })
  }

  render(){
    return (
      <div>
        <Menu />
        First Name: {this.state.userStoreState.firstName}<br/>
        Last Name: {this.state.userStoreState.lastName}<br/>
        ZIP: {this.state.userStoreState.zipCode}<br/>
        <Button onClick={()=> logOut()}/>
      </div>
    )
  }
}
