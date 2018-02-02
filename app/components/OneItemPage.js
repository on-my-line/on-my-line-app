import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import axios from 'axios'
import OneItemMap from './OneItemMap'
import GOOGLE_MAPS_API_KEY from '../FrontEndSecrets'
import {connect} from 'react-redux'

const mapState = (state) => {
    return {
        stop: state.stop,
        yelp: state.yelp,
        meetup: state.meetup,
        singleTrainStops: state.singleTrainStops,
    }
}

export class OneItemPage extends Component {
    render(){
        let currentStop = this.props.singleTrainStops.find(elem =>{
            return elem.properties.STOP_ID === this.props.stop
        })
        console.log("About to load the map ")
        return (
            <div>
                this is one item
                <OneItemMap google={this.props.google} currentStop={currentStop}/>
                
            </div>
        )
    }   
}    

const connected = connect(mapState)(OneItemPage)

export default GoogleApiWrapper({ apiKey: GOOGLE_MAPS_API_KEY})(connected)