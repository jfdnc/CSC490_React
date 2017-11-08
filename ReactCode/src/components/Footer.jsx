import React from 'react'

const Footer = (props) => {
  return(
    <div id="footer-wrap">
      <div id="footer-links">
        <div id="footer-tou" className="footer-link">Terms of Use</div>
        <div id="social-links">
          <div id="fb-link" className="social-link"><i className="fa fa-facebook-square"/></div>
          <div id="tw-link" className="social-link"><i className="fa fa-twitter-square"/></div>
        </div>
      </div>
      <div id="footer-side-info">
        <div id="footer-logo">eVol</div>
        <div id="footer-bottom-info">
          <div id="footer-email"> Email:<br/>eVolunteersUNCG@gmail.com
          </div>
          <div id="footer-copyright">
            2017 eVolunteers
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
