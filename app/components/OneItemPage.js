import React, { Component } from 'react'
import { withRouter } from "react-router";
import { GoogleApiWrapper } from 'google-maps-react'
import OneItemMap from './OneItemMap'
import SingleYelpPage from './SingleYelpPage'
import SingleMeetupPage from './SingleMeetupPage'
import SingleGooglePage from './SingleGooglePage'
import Marker from './Marker'
import {connect} from 'react-redux'


const mapState = (state) => {
    return {
        line: state.line,
        stop: state.stop,
        yelp: state.yelp,
        meetup: state.meetup,
        googleThing: state.google,
        singleTrainStops: state.singleTrainStops,
    }
}

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		textAlign: "center"
	},
	gridList: {
		width: 500,
		height: "auto",
		overflowY: "auto"
	}
};

export class OneItemPage extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        if(!this.props.singleTrainStops.length) return (
            <h1> Sorry! No data was fetched, how about you head home and pick out a line? </h1>
        )
        else{
        let type = this.props.match.params.type
        let thingId = this.props.match.params.thingId
        let currentStop = this.props.singleTrainStops.find(elem =>{
            return elem.properties.STOP_ID === this.props.stop
        })
        let currentThing = {}
        if(type === 'yelp') {
            currentThing = this.props.yelp.find(elem => {
                return elem.id === thingId
            })
        }
        if(type === 'meetup'){
            currentThing = this.props.meetup.find(elem => {
                return elem.id === thingId
            })
        } 
        if(type === 'google'){
            currentThing = this.props.googleThing.find(elem => {
                return elem.id === thingId
            })
        } 
        return (
            <div className="container">
            {(type === 'yelp')? 
            <SingleYelpPage currentThing={currentThing} style={styles.gridList}/>: ''
            }
            {(type === 'meetup')?
            <SingleMeetupPage currentThing={currentThing}/>:''
            }
            {(type === 'google')?
            <SingleGooglePage currentThing={currentThing}/>:''
            }
            {/* --------------- MAP ---------------- */}
            {currentThing &&
                <OneItemMap google={this.props.google} currentStop={currentStop} style={styles.gridList} >
                    <Marker currentThing={currentThing} />
                </OneItemMap>
            }
            </div>
        )
    }
    }
}    

const connected = connect(mapState)(OneItemPage)

export default withRouter(GoogleApiWrapper({ apiKey: 'AIzaSyDULSvfnNIRJqxnRh7VUkmsgnVz6-RwLGs'})(connected))
