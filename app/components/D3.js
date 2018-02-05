import React, { Component } from 'react'
//import { NavLink } from 'react-router-dom'
import CongressionalDistricts from './d3GeoTrial'
import axios from 'axios'
import nycBoroughs from '../../nycBoroughs'
import { connect } from 'react-redux'
import { fetchYelpThunk, fetchMeetupThunk, fetchEventBriteThunk, fetchSingleRouteThunk, fetchSingleStopsThunk, setLoading } from '../store'
import NavBar from './NavBar'
import { ClimbingBoxLoader } from 'react-spinners';

const dummy = [{coordinates: [-73.949724,40.744065], stopId: "G24"}, {coordinates: [-73.954449,40.731352], stopId:"G26"}]

class D3Trial extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('I AM MOUNTED I WILL MOUNT')
    this.props.fetchRouteAndStops(this.props.match.params.line)
  }


  render() {
    const lineParam = this.props.match.params.line
    const color = {"1": "#EE352E", "2": "#EE352E", "3": "#EE352E", "4": "#00933C", "5": "#00933C", "6": "#00933C", "7": "#B933AD", "A": "#0039A6", "C": "#0039A6", "E": "#0039A6", "B": "#FF6319", "D": "#FF6319", "F": "#FF6319", "M": "#FF6319", "J": "#996633", "Z": "#996633", "N": "#FCCC0A", "Q": "#FCCC0A" , "R": "#FCCC0A", "W": "#FCCC0A", "G": "#6CBE45", "L": "#A7A9AC", "S": "#808183"}

    if(!this.props.singleTrainStops.length || !this.props.singleRoute.length) {
      console.log('SINGLE STOPS IS EMPTY', this.props.singleTrainStops)
      return <div/>
    }
    return (
        <div className="scaling-svg-container">
            <div id="mapcontainer" >
              <ClimbingBoxLoader
                color={'#36D7B7'} 
                loading={this.props.loading} 
              />
              { !this.props.loading && <CongressionalDistricts id="D3Map" width={1280} height={600} singleRoute={this.props.singleRoute} singleTrainStops={this.props.singleTrainStops} nycBoroughs={nycBoroughs} color={color[lineParam]} /> }
            </div>
        </div>
    )
  }
}

const mapState = (state) => ({
  yelp: state.yelp,
  line: state.line,
  stop: state.stop,
  singleRoute: state.singleRoute,
  singleTrainStops: state.singleTrainStops,
  loading: state.loading
})

const mapDispatch = (dispatch) => {

  return {
    fetchYelp(arrayOfStops) {
      dispatch(fetchYelpThunk(arrayOfStops))
    },
    fetchMeetup(arrayOfStops){
      dispatch(fetchMeetupThunk(arrayOfStops))
    },
    fetchEventBrite(arrayOfStops){
      dispatch(fetchEventBriteThunk(arrayOfStops))
    },
    fetchRouteAndStops(currentRoute){
      dispatch(setLoading(true))
      dispatch(fetchSingleRouteThunk(currentRoute))
      dispatch(fetchSingleStopsThunk(currentRoute))
      .catch(console.error)
    }
  }
}

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