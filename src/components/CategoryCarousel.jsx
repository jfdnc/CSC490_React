import React from 'react'
import { Carousel } from 'react-bootstrap'
//importing TestStore to receive information
import TestStore from '../data/TestStore'
//importing actions to send actions to dispatcher
import * as TestActions from '../actions/TestActions'

//images for carousel
import paws from '../assets/animals.svg'
import elderly from '../assets/elderly.svg'
import homeless from '../assets/homeless.svg'
import community from '../assets/community.svg'
import kids from '../assets/kids.svg'

export default class CategoryCarousel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      volCategories: [
        "community",
        "nonprofits",
        "animals",
        "elderly",
        "homeless",
        "alliance",
        "kids"
      ],
      currCategoryIndex: 0,
      testData: TestStore.getAll()
    }
    this.state.currCategory = this.state.volCategories[this.state.currCategoryIndex]

    this.populateCarousel = this.populateCarousel.bind(this)
    this.setCurrentCategory = this.setCurrentCategory.bind(this)
    this.submitZipSearch = this.submitZipSearch.bind(this)
  }

  componentWillMount(){
    TestStore.on("change", () => {
      this.setState({
        testData: TestStore.getAll()
      })
    })
  }

  populateCarousel(){
    return(
      <div id="carousel-container" onClick={this.setCurrentCategory}>
        <Carousel id="main-carousel" interval={null}>
        <Carousel.Item id="community">
        <h1>MY COMMUNITY</h1>
        <div className="carousel-icon">
          <img src={community} height="155px"/>
        </div>
        </Carousel.Item>
          <Carousel.Item>
          <h1>NON-PROFITS</h1>
          <div className="carousel-icon">
            <i className="fa fa-heart"/>
          </div>
          </Carousel.Item>
          <Carousel.Item>
          <h1>ANIMALS</h1>
          <div className="carousel-icon">
            <img src={paws} height="175px"/>
          </div>
          </Carousel.Item>
          <Carousel.Item>
          <h1>THE ELDERLY</h1>
          <div className="carousel-icon">
            <img src={elderly} height="135px"/>
          </div>
          </Carousel.Item>
          <Carousel.Item>
          <h1>THE HOMELESS</h1>
          <div className="carousel-icon">
            <img src={homeless} height="135px"/>
          </div>
          </Carousel.Item>
          <Carousel.Item>
          <h1>DEFEAT THE EMPIRE</h1>
          <div className="carousel-icon">
            <i className="fa fa-rebel"/>
          </div>
          </Carousel.Item>
          <Carousel.Item>
          <h1>KIDS</h1>
          <div className="carousel-icon">
            <img src={kids} height="135px"/>
          </div>
          </Carousel.Item>

        </Carousel>
      </div>
    )
  }
  setCurrentCategory(e){
    var dir = e.target.className.slice(-4),
        n = this.state.volCategories.length
    if(dir != "left"){
      this.setState({currCategory:this.state.volCategories[((++this.state.currCategoryIndex%n)+n)%n]})
    } else {
      this.setState({currCategory:this.state.volCategories[((--this.state.currCategoryIndex%n)+n)%n]})
    }
  }
  submitZipSearch(e){
    e.preventDefault()
    console.log('TestStore contents before update',this.state.testData)
    console.log("text from GUI="+document.getElementById('SearchText').value)
    TestActions.changeName(document.getElementById('SearchText').value)

    //timeout simulate wait for server talk
    /*
    setTimeout(()=>{
      testAction('new data')
      console.log('TestStore contents after update',this.state.testData)
    }, 4000)
    */
  }

  render(){
    return(
      <div id="category-carousel">
      <div id="carousel-header">I want to help...</div>
      {this.populateCarousel()}
        <form id="zip-input-form">
          <div id="zip-wrapper">
            <input id="SearchText" type="text" name="fname"/>
            <input type="submit" value="Search" className="btn" onClick={this.submitZipSearch}/>
          </div>
        </form>
      </div>
    )
  }

}
