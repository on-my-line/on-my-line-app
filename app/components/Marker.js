import React, { Component } from 'react'

export class Marker extends Component {

    componentDidUpdate(prevProps){
            this.renderMarker()
    }

    renderMarker(){
        let { map, google, currentThing } = this.props
        if(!google) return null 
        let position = new google.maps.LatLng(currentThing.lat,currentThing.lon)
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