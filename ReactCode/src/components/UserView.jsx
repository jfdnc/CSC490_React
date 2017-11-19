import React from 'react'
import Dashboard from './Dashboard'

const UserView = (props) => {
  return(
    <div className='view-container'>
      <Dashboard type='user' userState={props}/>
    </div>
  )
}

export default UserView
