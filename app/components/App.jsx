import React from 'react'
import MainView from './MainView.jsx'
import { BrowserRouter } from 'react-router-dom'

const App = (props) => {
  return(
      <div id='app-container'>
        <BrowserRouter>
          <MainView name="eVol" {...props} />
        </BrowserRouter>
      </div>
  )
}

export default App
