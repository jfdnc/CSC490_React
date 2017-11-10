import React from 'react'
import VolOpListing from './VolOpListing'

export default class VolOpSearch extends React.Component{
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div id='volop-search-container'>
        <div id='search-container'>
          <div id='search-options'>
          Search options
          </div>
          <div id='search-results'>
            <VolOpListing/>
            <VolOpListing/>
            <VolOpListing/>
            <VolOpListing/>
            <VolOpListing/>
            <VolOpListing/>
            <VolOpListing/>
            <VolOpListing/>
            <VolOpListing/>
          </div>
        </div>
      </div>
    )
  }
}
