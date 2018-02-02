import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import axios from 'axios'
import OneItemMap from './OneItemMap'
import Marker from './Marker'
import GOOGLE_MAPS_API_KEY from '../FrontEndSecrets'
import {connect} from 'react-redux'

const mapState = (state) => {
    return {
        line: state.line,
        stop: state.stop,
        yelp: state.yelp,
        meetup: state.meetup,
        singleTrainStops: state.singleTrainStops,
    }
}

export class OneItemPage extends Component {
    render(){
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
        return (
            <div>
                <OneItemMap google={this.props.google} currentStop={currentStop}>
                    <Marker currentThing={currentThing} />
                </OneItemMap>
            </div>
        )
    }
}    

const connected = connect(mapState)(OneItemPage)

export default GoogleApiWrapper({ apiKey: GOOGLE_MAPS_API_KEY})(connected)
