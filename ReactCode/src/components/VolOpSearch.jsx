import React from 'react'
import VolOpListing from './VolOpListing'
import { Input, Col, Row, Button } from 'react-materialize'

export default class VolOpSearch extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      radioState: {
        animals: false,
        community: false,
        elderly: false,
        homeless: false,
        kids: false
      },
      volOpList:[]
    }

    this.handleRadioClicked = this.handleRadioClicked.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.populateVolOpList = this .populateVolOpList.bind(this)
  }

  handleRadioClicked(e){
    let radioState = Object.assign({},this.state.radioState)
    radioState[e.target.value] = !radioState[e.target.value]
    this.setState({radioState})
  }

  handleSearch(){
    let searchZip = document.getElementById('search-zip').value
    let warning = document.getElementById('search-error-warning')

    if(searchZip.length == 5){
      warning.style.opacity = '0'
      warning.style.visibility = 'hidden'
      let currState = this.state.radioState
      let categoriesSelected = []
      for(let category in currState){
        if(currState[category]){
          categoriesSelected.push(category)
        }
      }

      let searchInfo = {
        zip: searchZip,
        cats: categoriesSelected
      }

      let volOpList
      let getVolops = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/volops');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.populateVolOpList(xhr.response, searchInfo)
            }
        });
        xhr.send(); //eslint-disable-line
      });

      getVolops()
    } else {
      warning.style.visibility = 'visible'
      warning.style.opacity = '1'
    }
  }

  populateVolOpList(volops, searchInfo){
    let volOpList = volops

    this.setState({ volOpList })
  }
  render(){
    return(
      <div id='volop-search-container'>
        <div id='search-container'>
          <div id='search-options'>
            <div id='search-radio-buttons'>
              <h5>Select the categories you're passionate about</h5>
              <hr/><br/>
              <Row>
                <Input s={4} label="Animals" value='animals' onClick={(e)=>this.handleRadioClicked(e)} type="checkbox"></Input>
                <Input s={4} label="My Community" value='community' onClick={(e)=>this.handleRadioClicked(e)} type="checkbox"></Input>
                <Input s={4} label="The Elderly" value='elderly' onClick={(e)=>this.handleRadioClicked(e)} type="checkbox"></Input>
                </Row>
                <Row>
                <Input s={6} label="Homelessness" value='homeless' onClick={(e)=>this.handleRadioClicked(e)} type="checkbox"></Input>
                <Input s={6} label="Kids" value='kids' onClick={(e)=>this.handleRadioClicked(e)} type="checkbox"></Input>
              </Row>
            </div>
            <div id='search-zip-container'>
              <Row>
                <Input s={6} id='search-zip' label='ZIP'></Input>
                <div s={6} id='search-submit'><Button onClick={()=>this.handleSearch()}>Search</Button></div>
              </Row>
            </div>
          </div>
          <div id='search-results'>
          <div id='search-error-warning'>
            Enter 5-digit ZIP
          </div>
          <hr/>
          {this.state.volOpList.map(volop =>{
            return(
              <VolOpListing {...volop}/>
            )
          })}
          </div>
        </div>
      </div>
    )
  }
}
