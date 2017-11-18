import React from 'react'
import GuestDashboardLayout from './GuestDashboardLayout'
import OrgDashBoardLayout from './OrgDashBoardLayout'
import UserDashBoardLayout from './UserDashBoardLayout'

export default class Dashboard extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      type: props.type
    }

  }

  render(){
    let currLayout
    switch(this.state.type){
      case 'guest':
        currLayout = <GuestDashboardLayout {...this.props} />
        break
      case 'org':
        currLayout = <OrgDashBoardLayout {...this.props} />
        break
     case 'user':
        currLayout = <UserDashBoardLayout {...this.props} />
        break
    }
    return(
      <div className='dashboard-container'>
        {currLayout}
      </div>
    )
  }
}
