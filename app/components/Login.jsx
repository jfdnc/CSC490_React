import React from 'react'
import { CSSTransition } from 'react-transition-group'

export default class Login extends React.Component {
  constructor(props){
    super(props)

  }

  render(){
    return(
      <CSSTransition
        in={true}
        appear={true}
        enter={true}
        classNames="fade"
        timeout={300}>
        <div id='login-view' className='view-container'>
        <div id='onsite'></div>
        <div id='offsite'></div>
        </div>
      </CSSTransition>
    )
  }
}
