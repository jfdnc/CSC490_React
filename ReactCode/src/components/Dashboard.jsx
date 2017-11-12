import React from 'react'
import GuestDashboardLayout from './GuestDashboardLayout'
import OrgDashBoardLayout from './OrgDashBoardLayout'
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
        currLayout = <GuestDashboardLayout />
        break
      case 'org':
        currLayout = <OrgDashBoardLayout />
        break
    }
    return(
      <div className='dashboard-container'>
        {currLayout}
      </div>
    )
  }
}
