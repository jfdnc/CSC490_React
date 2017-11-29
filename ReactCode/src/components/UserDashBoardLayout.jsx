import React from 'react'
import UserStore from '../data/stores/UserStore'
import VolOpSearch from './VolOpSearch'
import EditUser from './EditUser'
import { editUser } from '../actions/user_actions'
import { Icon, Button } from 'react-materialize'

export default class UserDashBoardLayout extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      user: UserStore.getAll().user,
      view: 'saved'
    }

    this.handleClick = this.handleClick.bind(this)
    this.populateSavedVolops = this.populateSavedVolops.bind(this)
    this.populateWindowView = this.populateWindowView.bind(this)
    this.removeSavedVolOp = this.removeSavedVolOp.bind(this)
    this.populateUserFeed = this.populateUserFeed.bind(this)
  }

  componentWillMount(){
    console.log(UserStore.getAll().user)
    UserStore.on('change', function() {
      console.log(UserStore.getAll())
    })
  }

  handleClick(type){
    this.setState({view:type})
  }

  populateSavedVolops(){
    let savedVolOps = this.state.user.savedVolOps
    console.log(savedVolOps)
    return(
      <div id='user-saved-volops'>
        <a id='user-switch-volop-view' onClick={()=>this.handleClick('volop-search')}>Find new volunteer opportunities</a>
        <div id='user-saved-volop-list'>
        {savedVolOps.length ? savedVolOps.map((id,i) => {
          return(
            <div id='user-volop' key={i}>
              <div id='user-remove-volop' onClick={()=> this.removeSavedVolOp(id)}>
                <Icon>delete</Icon>
              </div>
              <div id='user-volop-description'>
                {id}
              </div>
            </div>
          )
        }) :
            <h5>no volops saved yet</h5>}
        </div>
      </div>
    )
  }

  populateUserFeed(){
    return(
      <div id='example-user-feed'>
        <div id='share-volops-to-twitter' style={{gridRow:2,display:'grid',gridGap:'6px',gridTemplateColumns:'1fr 1fr'}}>
          <Button onClick={() => console.log('Share to Twitter!')}>Tell Your Friends!</Button>
          <Button onClick={() => console.log('Share to Twitter!')}> Share to Twitter</Button>
        </div>
      </div>
    )
  }

  populateWindowView(){
    switch(this.state.view){
      case 'saved':
        return(this.populateSavedVolops())
        break
      case 'volop-search':
        return(
          <div>
            <a id='user-switch-saved-view' onClick={()=>this.handleClick('saved')}>View saved volunteer opportunities</a>
            <VolOpSearch userType='user' {...this.props}/>
          </div>
        )
        break
      case 'edit':
        return(
          <div id='edit-user-container'>
            <a id='user-back' onClick={()=>this.handleClick('saved')}>Back</a>
            <EditUser {...this.state.user}/>
          </div>
        )
    }
  }

  removeSavedVolOp(id){
    let newUserState = Object.assign({}, this.state.user)
    newUserState.savedVolOps = newUserState.savedVolOps.filter(volopid => volopid != id)
    editUser(newUserState)
    localStorage.setItem('userInfo', JSON.stringify(newUserState))
    this.setState({ user: newUserState })
  }


  render(){
    return(
      <div id='dashboard-user'>
        <div id='user-details'>
          <div id='user-img'>
            <Icon>account_circle</Icon>
          </div>
          <div id='user-edit'>
            <a onClick={()=>this.handleClick('edit')}>Edit Details</a>
          </div>
          <div id='user-header'>
            Welcome back, {this.state.user.firstName}!
          </div>
        </div>
        <div id='user-feed'>
          {this.populateUserFeed()}
        </div>
        <div id='user-volop-container'>
          {this.populateWindowView()}
        </div>
      </div>
    )
  }
}
