import React, { Component } from 'react'
import {connect} from 'react-redux'
import { GridList, GridTile } from 'material-ui/GridList';
//import { setStop } from '../store'

const mapState = (state) => {
    return{
        line: state.line,
        stop: state.stop,
        yelp: state.yelp,
        meetup: state.meetup,
        singleTrainStops: state.singleTrainStops,
    }
}

// const mapDispatch = (dispatch) => {
//     return{
//         setCurrentStop: stop => dispatch(setStop(stop))
//     }
// }


class SingleStopList extends Component {

    render() {
        if(this.props.singleTrainStops){
            const { stop, singleTrainStops } = this.props
            let singleStop = singleTrainStops.filter(currentStop => {
                return currentStop.properties.STOP_ID === stop})
            let yelpThings = this.props.yelp.filter( thing => {
                return thing.stopId === stop
            })
            let meetupThings = this.props.meetup.filter( thing => {
                return thing.stopId === stop
            })
            return (
                <div>
                    <h1>Things to do near {singleStop[0].properties.STOP_NAME}</h1>
                <GridList
                    cols={1}
                    cellHeight={300}
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
                {meetupThings.map(thing => 
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
        else{
            return (
                <div>
                Loading
                </div>
            )
        }
        }
}


export default connect(mapState)(SingleStopList)