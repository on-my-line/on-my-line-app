import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class OneItemMap extends Component {
    constructor(props){
        super(props)
        const {lat, lng} = this.props.initalCenter
        this.state = {
            currentCenter: {
                lat: lat,
                lng: lng,
            }
        }
    }
    
    componentDidUpdate(prevProps, prevState){
        console.log("COMPONENT DID UPDATE: ", this.state.currentCenter)
        if(prevProps.google !== this.props.google){
            this.loadMap()
        }
        if(prevProps.currentCenter !== this.props.currentCenter){
            console.log("RENDERING AGAIN")
            this.recenterMap()
        }
    }

    componentDidMount(){
        if(this.props.currentStop){
            //console.log("IN THE IF", this.props)
            this.setState({
                currentCenter: {
                    lat: this.props.currentStop.geometry.coordinates[1],
                    lng: this.props.currentStop.geometry.coordinates[0]
                }
            })
        }
        this.loadMap()
    }

    recenterMap(){
        const map = this.map
        const current = this.state.currentCenter

        const google = this.props.google
        const maps = google.maps

        if(map){
            let newCenter  = new maps.LatLng(current.lat, current.lng)
            map.panTo(newCenter)
        }
    }

    loadMap(){
        //let { center } = this.props
        // if(this.props.stop && this.props.singleTrainStops){
        //     let currentStop = this.props.singleTrainStops.find(elem =>{
        //         return elem.properties.STOP_ID === this.props.stop
        //     })
        //     center.lat = currentStop.geometry.coordinates[0]
        //     center.lng = currentStop.geometry.coordinates[1]
        // }

        if(this.props && this.props.google){
            const { google } = this.props
            const maps = google.maps
            const mapRef = this.refs.map
            const node = ReactDOM.findDOMNode(mapRef)
            
            let { initalCenter } = this.props
            let {lat, lng } = initalCenter
            // let lat = (this.props.currentStop) ? this.props.currentStop.geometry.coordinates[0] : 40.724635
            // let lng = (this.props.currentStop) ? this.props.currentStop.geometry.coordinates[1] : -73.951277//
            let zoom = 14
            
            const mapConfig = Object.assign({}, {
                center: {lat: lat, lng: lng}, 
                zoom: zoom
            })
            this.map = new maps.Map(node, mapConfig)
            }
            console.log("THE MAP WAS LOADED")
        }

    render(){
        const style = {
            width: '100vw',
            height: '40vh'
            }

       return (
            <div ref='map' style={style}>
                Loading map...
            </div>
       )
    }
}

OneItemMap.defaultProps = {
    initalCenter: {lat:40.724635, lng:-73.951277},
    centerAroundStop: false,
}



export default OneItemMap