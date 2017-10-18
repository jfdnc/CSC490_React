import React from 'react'
import { CSSTransition } from 'react-transition-group'
export default class Contact extends React.Component {
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
        <div id='contact-view' className='view-container'>
          CONTACT PAGE GOES HERE
        </div>
      </CSSTransition>
    )
  }
}
