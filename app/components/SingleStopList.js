import React, { Component } from 'react'
import {connect} from 'react-redux'
import { GridList, GridTile } from 'material-ui/GridList';

const mapState = (state) => {
    return{
        line: state.line,
        stop: 'G24',
        yelp: state.yelp,
        meetup: state.meetup
    }
}


class SingleStopList extends Component {

    render() {
        const { stopId } = this.props
        let yelpThings = this.props.yelp.filter( thing => thing.stopId === stopId)
        return (
            <div>
                <h1>Things to do near {this.props.stop}</h1>
                <GridList
                    cols={1}
                    cellHeight={200}
                >
                {yelpThings.map(thing => {
                    console.log(thing)
                    return 
                        <GridTile 
                        key={thing.id}
                        title={thing.name}
                        subtitle={<span><b>{thing.rating, thing.price}</b></span>}
                        >
                        <img src={thing.img} />
                        </GridTile>
                    
                })
                }
                </GridList>
            </div>
    )}
}


export default connect(mapState)(SingleStopList)