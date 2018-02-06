import React, { Component } from 'react'
//import { NavLink } from 'react-router-dom'
import CongressionalDistricts from './d3GeoTrial'
import axios from 'axios'
import nycBoroughs from '../../nycBoroughs'
import { connect } from 'react-redux'
import { fetchYelpThunk, fetchMeetupThunk, fetchEventBriteThunk, fetchSingleRouteThunk, fetchSingleStopsThunk, setLoading } from '../store'
import NavBar from './NavBar'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class D3Trial extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      additionalLine: "",
      additionalRoute: [], 
      additionalStops: []
    }
    this.addOtherLine = this.addOtherLine.bind(this)

  }

  componentDidMount() {
    this.props.fetchRouteAndStops(this.props.match.params.line)
  }

  addOtherLine(e) {
    let additionalLine = e.target.innerHTML
    this.setState({ additionalLine: e.target.innerHTML })
    let self = this
    axios.get(`/routes/${additionalLine}`)
    .then(res =>  self.setState({additionalRoute: res.data}))
    .then(() => axios.get(`/stops/${additionalLine}`))
    .then(res =>  self.setState({additionalStops: res.data}))
    .catch(err => console.error(err))
  }

  render() {
    const lineParam = this.props.match.params.line
    const color = {"1": "#EE352E", "2": "#EE352E", "3": "#EE352E", "4": "#00933C", "5": "#00933C", "6": "#00933C", "7": "#B933AD", "A": "#0039A6", "C": "#0039A6", "E": "#0039A6", "B": "#FF6319", "D": "#FF6319", "F": "#FF6319", "M": "#FF6319", "J": "#996633", "Z": "#996633", "N": "#FCCC0A", "Q": "#FCCC0A" , "R": "#FCCC0A", "W": "#FCCC0A", "G": "#6CBE45", "L": "#A7A9AC", "S": "#808183"}
    const otherLines = ["1", "2", "3", "4", "5", "6", "7", "A", "B", "C", "D", "E", "F", "G", "J", "L", "M", "N", "Q", "R", "S", "W", "Z"].filter(line => line !== this.props.match.params.line)
    if(!this.props.singleTrainStops.length || !this.props.singleRoute.length) {
      return <div/>
    }
    return (
        <div className="scaling-svg-container">
            <div className="keyBar">
              <SelectField
                className="fade"
                name="line"
                floatingLabelText="Choose other line..."
                value={this.state.additionalLine}
                onChange={event => this.addOtherLine(event)}
                maxHeight={180}
              >
                {
                  otherLines.map(line => <MenuItem key={line} value={line} primaryText={line} />)
                }
              </SelectField>
              <span id="key"><span><img src='images/museum.svg'/>&nbsp;&nbsp;museum</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><img src='images/event.svg'/>&nbsp;&nbsp;Meetup</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><img src='images/place.svg'/>&nbsp;&nbsp;Yelp</span></span>
            </div>
            <div id="mapcontainer" >
              <CongressionalDistricts id="D3Map" width={1280} height={600} singleRoute={this.props.singleRoute} singleTrainStops={this.props.singleTrainStops} additionalRoute={this.state.additionalRoute} additionalStops={this.state.additionalStops} additionalLine={this.state.additionalLine} nycBoroughs={nycBoroughs} color={color[lineParam]} additionalColor={color[this.state.additionalLine]}/> 
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