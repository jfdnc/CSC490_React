import React from 'react'
import { CSSTransition } from 'react-transition-group'
export default class Register extends React.Component {
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
        <div id='register-view' className='view-container'>
          <div id='onsite'></div>
          <div id='offsite'></div>
        </div>
      </CSSTransition>
    )
  }
}
