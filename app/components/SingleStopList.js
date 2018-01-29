import React, { Component } from 'react'
import {connect} from 'react-redux'
import { GridList, GridTile } from 'material-ui/GridList';
import allStops from '../../allStops'

const mapState = (state) => {
    return{
        line: state.line,
        stop: 'G24',
        yelp: //this.props.yelp
        [{id:"jora-restaurant-and-bar-long-island-city",
        img :"https://s3-media3.fl.yelpcdn.com/bphoto/Fzckhw-nQGKVyBUKmsIfMA/o.jpg",
        lat :40.74381,
        location:"47-46 11th St",
        lon:-73.95153,
        name:"Jora Restaurant & Bar",
        phone:"+17183922033",
        price:"$$",
        rating:4.5,
        stopId:"G24",
        url:"https://www.yelp.com/biz/jora-restaurant-and-bar-long-island-city?adjust_creative=iNvbAbvn2KCBA7NpeaKqUA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=iNvbAbvn2KCBA7NpeaKqUA",
        }],
    }
}



class SingleStopList extends Component {
    render() {
        const { stop } = this.props
        const stopsArray = allStops.features
        let singleTrainStop = stopsArray.filter(currentStop => {
            return currentStop.properties.STOP_ID === stop})
        console.log(singleTrainStop)
        let yelpThings = this.props.yelp.filter( thing => {
            return thing.stopId === stop
        })
        //console.log(yelpThings)
        return (
            <div>
                <h1>Things to do near {singleTrainStop[0].properties.STOP_NAME}</h1>
            <GridList
                cols={1}
            >
            {yelpThings.map(thing => 
                <GridTile 
                key={thing.id}
                // onClick={(e) => {
                //   e.preventDefault
                //  route to single page
                // }}
                title={thing.name}
                subtitle={<span>Rating: {thing.rating}</span>}
                >
                {(thing.img) ? <img src={thing.img}/> : ""}
                </GridTile>)}
            </GridList>
            </div>
    )}
}


export default connect(mapState)(SingleStopList)