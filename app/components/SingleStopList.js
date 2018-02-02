import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import { GridList, GridTile } from 'material-ui/GridList';
//import { setStop } from '../store'
import { blue500, red500, greenA200 } from "material-ui/styles/colors";
import SvgIcon from "material-ui/SvgIcon";
import IconButton from "material-ui/IconButton";
import Subheader from "material-ui/Subheader";
import StarBorder from "material-ui/svg-icons/toggle/star-border";



const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around"
	},
	gridList: {
		width: 500,
		height: 450,
		overflowY: "auto"
	}
};
const HomeIcon = props => (
	<SvgIcon {...props}>
		<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
	</SvgIcon>
);

const mapState = (state) => {
    return{
        line: state.line,
        stop: state.stop,
        yelp: state.yelp,
        meetup: state.meetup,
        singleRoute: state.singleRoute,
        singleTrainStops: state.singleTrainStops,
    }
}





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