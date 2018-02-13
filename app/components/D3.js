import React, { Component } from 'react'
import CongressionalDistricts from './d3GeoTrial'
import axios from 'axios'
import nycBoroughs from '../../nycBoroughs'
import { connect } from 'react-redux'
import { fetchYelpThunk, fetchMeetupThunk, fetchEventBriteThunk, fetchSingleRouteThunk, fetchSingleStopsThunk, setLoading } from '../store'
import NavBar from './NavBar'
//Material-ui
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { List, ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import IconYelp from 'material-ui/svg-icons/maps/place'
import IconMuseum from 'material-ui/svg-icons/action/account-balance'
import IconMeetup from 'material-ui/svg-icons/action/event'

class D3Trial extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      additionalLine: "",
      additionalRoute: [], 
      additionalStops: [],
      yelpToggled: true,
      museumToggled: true,
      meetupToggled: true
    }
    this.addOtherLine = this.addOtherLine.bind(this)
    this.handleToggle = this.handleToggle.bind(this)

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

  handleToggle(event, type) {
    this.setState({ [`${type}Toggled`]: !this.state[`${type}Toggled`]})
  }

  render() {
    const lineParam = this.props.match.params.line
    const color = {"1": "#EE352E", "2": "#EE352E", "3": "#EE352E", "4": "#00933C", "5": "#00933C", "6": "#00933C", "7": "#B933AD", "A": "#0039A6", "C": "#0039A6", "E": "#0039A6", "B": "#FF6319", "D": "#FF6319", "F": "#FF6319", "M": "#FF6319", "J": "#996633", "Z": "#996633", "N": "#FCCC0A", "Q": "#FCCC0A" , "R": "#FCCC0A", "W": "#FCCC0A", "G": "#6CBE45", "L": "#A7A9AC", "S": "#808183"}
    const otherLines = ["1", "2", "3", "4", "5", "6", "7", "A", "B", "C", "D", "E", "F", "G", "J", "L", "M", "N", "Q", "R", "S", "W", "Z"].filter(line => line !== this.props.match.params.line)
    if(!this.props.singleTrainStops.length || !this.props.singleRoute.length) {
      if(this.props.match.params.line === 'login' || this.props.match.params.line === 'signup') return <div />
      if(this.props.match.params.line !== 'login') return <h1> Sorry this isn't a valid subway line!</h1>
    }

    return (
        <div className="scaling-svg-container">
            <div className="keyBar">
              <SelectField
                className="SelectField"
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
              <List className="list-horizontal-display">
                <ListItem primaryText="Museum" leftIcon={<IconMuseum />} rightToggle={<Toggle onToggle={(event) => this.handleToggle(event, 'museum')} defaultToggled={this.state.museumToggled} />}/>
                <ListItem primaryText="Yelp" leftIcon={<IconYelp />} rightToggle={<Toggle onToggle={(event) => this.handleToggle(event, 'yelp')} defaultToggled={this.state.yelpToggled} />}/>
                <ListItem primaryText="Meetup" leftIcon={<IconMeetup />} rightToggle={<Toggle onToggle={(event) => this.handleToggle(event, 'meetup')} defaultToggled={this.state.meetupToggled} />}/>
              </List>
            </div>
            <div id="mapcontainer" >
              <CongressionalDistricts 
                id="D3Map" 
                width={1280} 
                height={600} 
                singleRoute={this.props.singleRoute} 
                singleTrainStops={this.props.singleTrainStops} 
                additionalRoute={this.state.additionalRoute} 
                additionalStops={this.state.additionalStops} 
                additionalLine={this.state.additionalLine} 
                nycBoroughs={nycBoroughs} 
                color={color[lineParam]} 
                additionalColor={color[this.state.additionalLine]} 
                yelpBool={this.state.yelpToggled}
                museumBool={this.state.museumToggled}
                meetupBool={this.state.meetupToggled}
              /> 
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

const D3 = connect(mapState, mapDispatch)(D3Trial)
export default D3