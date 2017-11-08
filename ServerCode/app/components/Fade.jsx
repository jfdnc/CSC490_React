import React from 'react'
import { CSSTransition } from 'react-transition-group'

const Fade = (props) => {
  return (
    <CSSTransition
       in={true}
       appear={true}
       exit={true}
       classNames='fade'
       timeout={300}>
       {props.children}
    </CSSTransition>
  )
}

export default Fade
