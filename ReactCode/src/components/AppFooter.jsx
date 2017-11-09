import React from 'react'
import { Footer } from 'react-materialize'

const AppFooter = (props) => {
  return(
    <Footer copyrights="Copyright 2017 -- eVolunteers"
          	moreLinks={
          		<a className="black-text text-lighten-4 right" href="https://github.com/jfdnc/CSC490_React" target="_blank">view project on Github</a>
          	}
          	className='white'
          ></Footer>
  )
}

export default AppFooter
