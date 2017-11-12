import React from 'react'
import { Preloader } from 'react-materialize'
const loaderOverlayStyle = {
  position: 'absolute',
  display: 'flex',
  backgroundColor: 'rgba(0,0,0,0.6)',
  width: '100vw',
  height: '100vh',
  zIndex: '99998',
  visibility: 'hidden'
}
const loaderStyle = {
  position: 'relative',
  margin: 'auto auto',
  backgroundColor: 'white',
  borderRadius: "3px",
  border: '1px solid rgba(0,0,0,0.9)',
  width: '280px',
  height: '280px',
  zIndex: '99999',
  display: 'flex',
  flexDirection: 'column'
}
const loadingMessageStyle = {
  fontSize: '24px',
  margin:"0 auto 24px auto",
  fontWeight: 'bold'

}
const Loading = (props) => {
  return(
    <div id="loader-overlay" style={loaderOverlayStyle}>
      <div id="loader" style={loaderStyle}>
        <div style={{margin:"auto"}}>
          <Preloader size='big'/>
        </div>
        <div id='loading-message' style={loadingMessageStyle}>
        </div>
      </div>
    </div>
  )
}

export default Loading
