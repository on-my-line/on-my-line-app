import React, { Component } from 'react'

export class Marker extends Component {
    
    componentDidUpdate(prevProps){
        if((this.props.map !== prevProps.map) || (this.props.currentThing !== prevProps.currentThing)){
            this.renderMarker()
        }
    }

    renderMarker(){
        let { map, google, currentThing, mapCenter } = this.props

        let position = new google.maps.LatLng(currentThing.lat, currentThing.lon)
        const config = { 
            map: map,
            position: position
        }
        this.marker = new google.maps.Marker(config)
    }
    
    render() {
        return null
    }
}

export default Marker