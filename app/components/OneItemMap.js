import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class OneItemMap extends Component {
    
    componentDidUpdate(prevProps, prevState){
        if(prevProps.google !== this.props.google){
            this.loadMap()
        }
    }

    componentDidMount(){
        this.loadMap()
    }

    loadMap(){
        if(this.props && this.props.google && this.props.currentStop){
            const { google, currentStop } = this.props
            const maps = google.maps
            const mapRef = this.refs.map
            const node = ReactDOM.findDOMNode(mapRef)
            
            let lat = currentStop.geometry.coordinates[1] 
            let lng = currentStop.geometry.coordinates[0]
            
            const mapConfig = Object.assign({}, {
                center: {lat: lat, lng: lng}, 
                zoom: 15
            })
            this.map = new maps.Map(node, mapConfig)
            }
        this.forceUpdate()
        }

    
    renderChildren(){
        const { children } = this.props
        if(!children) return
        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                    map: this.map,
                    google: this.props.google,
                    mapCenter: {lat: this.props.currentStop.geometry.coordinates[1], lng:this.props.currentStop.geometry.coordinates[0]}
            })
        })
    }

    render(){
        const style = {
            width: '68vw',
            height: '68vh'
            }
       return (
            <div ref='map' style={style}>
                Loading map...
                {this.renderChildren()}
            </div>
       )
    }
}


export default OneItemMap