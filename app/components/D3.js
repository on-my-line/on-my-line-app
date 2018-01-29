import React, { Component } from 'react'
import CongressionalDistricts from './d3GeoTrial'
import allRoutes from '../../allRoutes'
import allStops from '../../allStops'
import { connect } from 'react-redux'
import { fetchYelpThunk, fetchMeetupThunk, fetchEventBriteThunk } from '../store'

const dummy = [{coordinates: [-73.949724,40.744065], stopId: "G24"}, {coordinates: [-73.954449,40.731352], stopId:"G26"}]

class D3Trial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      targetLine: ''
    }
   // this.handleSubmit = this.handleSubmit.bind(this)
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
    console.log(lineParam)
    const singleRoute = allRoutes.features.filter(route => route.properties.route_id === lineParam)
    const singleTrainStops = allStops.features.filter(stop => {
      const stopSet = new Set(stop.properties.Routes_ALL.split(', '))
      return stopSet.has(lineParam)
    })
    return (
        <div className="scaling-svg-container">
            <h1>hello nyc</h1>
                {/* <form onSubmit={this.handleSubmit}>
                    <select name="targetLine">
                    {
                        lines.map((line, i) => (<option key={line} value={line}>{line}</option>))
                    }
                    </select>
                        <button type="submit" value="Submit">Submit</button>
                </form> */}
                {/* tes tes tes t */}
                <svg className="scaling-svg">
                    <CongressionalDistricts width={800} height={800} singleRoute={singleRoute} singleTrainStops={singleTrainStops}/>
                </svg>
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

const D3 =  connect(mapState, mapDispatch)(D3Trial)
export default D3