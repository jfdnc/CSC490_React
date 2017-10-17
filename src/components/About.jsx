import React from 'react'
import { CSSTransition } from 'react-transition-group'
export default class About extends React.Component {
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
        <div id='about-view' className='view-container'>
          ABOUT PAGE GOES HERE
        </div>
      </CSSTransition>
    )
  }
}
