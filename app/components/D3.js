import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import D3Map from './d3GeoTrial'
import allRoutes from '../../allRoutes'
import allStops from '../../allStops'
import nycBoroughs from '../../nycBoroughs'
import { connect } from 'react-redux'
import { fetchYelpThunk, fetchMeetupThunk, fetchEventBriteThunk } from '../store'

const dummy = [{coordinates: [-73.949724,40.744065], stopId: "G24"}, {coordinates: [-73.954449,40.731352], stopId:"G26"}]

class D3Trial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      targetLine: ''
    }
  }

  componentDidMount() {
    //event.preventDefault()
    //this.setState({ targetLine: event.target.targetLine.value })
    // this.props.fetchYelp(
    //   allStops.features.filter(stop => {
    //     const stopSet = new Set(stop.properties.Routes_ALL.split(', '))
    //     return stopSet.has('F') 
    //   })
    //   .map( stop => stop.geometry.coordinates)
    // )
    this.props.fetchYelp(dummy)
    this.props.fetchMeetup(dummy)
    //this.props.fetchEventBrite(dummy)
  }

  render() {
    const lineParam = this.props.match.params.line
    const color = {"1": "#EE352E", "2": "#EE352E", "3": "#EE352E", "4": "#00933C", "5": "#00933C", "6": "#00933C", "7": "#B933AD", "A": "#0039A6", "C": "#0039A6", "E": "#0039A6", "B": "#FF6319", "D": "#FF6319", "F": "#FF6319", "M": "#FF6319", "J": "#996633", "Z": "#996633", "N": "#FCCC0A", "Q": "#FCCC0A" , "R": "#FCCC0A", "W": "#FCCC0A", "G": "#6CBE45", "L": "#A7A9AC", "S": "#808183"}
    const singleRoute = allRoutes.features.filter(route => route.properties.route_id === lineParam)
    const singleTrainStops = allStops.features.filter(stop => {
      const stopSet = new Set(stop.properties.Routes_ALL.split(', '))
      return stopSet.has(lineParam)
    })

    return (
        <div className="scaling-svg-container">
            <div id="mapcontainer" >
              <D3Map id="D3Map" width={1000} height={1000} singleRoute={singleRoute} singleTrainStops={singleTrainStops} nycBoroughs={nycBoroughs} color={color[lineParam]}/>
            </div>

        </div>
    )
  }
}

const mapState = (state) => ({
  yelp: state.yelp
})

const mapDispatch = (dispatch) => ({
  fetchYelp(arrayOfStops) {
    dispatch(fetchYelpThunk(arrayOfStops))
  },
  fetchMeetup(arrayOfStops){
    dispatch(fetchMeetupThunk(arrayOfStops))
  },
  fetchEventBrite(arrayOfStops){
    dispatch(fetchEventBriteThunk(arrayOfStops))
  },
})

// this.props.match.params.line
//<h1>hello nyc</h1>
           /*<ul>
              {
                singleTrainStops.map(stop => {
                  return (
                    <li key={stop.properties.STOP_ID}>
                      <NavLink to={`/${lineParam}/${stop.properties.STOP_ID}`}>{stop.properties.STOP_NAME}</NavLink>
                    </li>
                  )
                })
              }
            </ul>*/
const D3 =  connect(mapState, mapDispatch)(D3Trial)
export default D3