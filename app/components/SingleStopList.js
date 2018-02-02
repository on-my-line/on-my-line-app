import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import { GridList, GridTile } from 'material-ui/GridList';
import OneItemPage from './OneItemPage'

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

// handleClick(event){
//     event.preventDefault
//     console.log("YOU CLICKED ME")
// }


class SingleStopList extends Component {

    render() {
        if(this.props.singleTrainStops){
            const { stop, singleTrainStops, line } = this.props
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
                    title={thing.name}
                    subtitle={<span>Rating: {thing.rating}</span>}
                    >
                    <NavLink to={`/${line}/${stop}/yelp/${thing.id}`}>
                    {(thing.img) ? <img src={thing.img}/> : ""}
                    </NavLink>
                    </GridTile>
                )}
                {meetupThings.map(thing => 
                    <GridTile 
                    key={thing.id}
                    title={thing.name}
                    subtitle={<span>Rating: {thing.rating}</span>}
                    >
                    <NavLink to={`/${line}/${stop}/meetup/${thing.id}`}>
                    {(thing.img) ? <img src={thing.img}/> : ""}
                    </NavLink>
                    </GridTile>
                )}
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