import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { GridList, GridTile } from 'material-ui/GridList';
//import { setStop } from '../store'
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
   
            return <div style={styles.root}>
								<GridList cellHeight={180} style={styles.gridList}>
									<Subheader>
										{`Things to do near: ${
											singleStop[0].properties.STOP_NAME
										}`}
									</Subheader>
									{yelpThings.map(thing => (
										<GridTile
											key={thing.id}
											// onClick={(e) => {
											//   e.preventDefault
											//  route to single page
											// }}
											title={thing.name}
											subtitle={<span>Rating: {thing.rating}</span>}
											actionIcon={
												<IconButton>
													<StarBorder color="white" />
												</IconButton>
											}
										>
											{thing.img ? (
												<img src={thing.img} />
											) : (
												<img src="https://yt3.ggpht.com/a-/AK162_53TCkRV0sl6Bx6OpTBE49CVTtyNoJyazMZFg=s900-mo-c-c0xffffffff-rj-k-no" />
											)}
										</GridTile>
									))}
									{meetupThings.map(thing => (
										<GridTile
											key={thing.id}
											// onClick={(e) => {
											//   e.preventDefault
											//  route to single page
											// }}
											title={thing.name}
											subtitle={<span>Rating: {thing.rating}</span>}
										>
											{thing.img ? (
												<img src={thing.img} />
											) : (
												<img src="https://thumb7.shutterstock.com/display_pic_with_logo/2117717/504799285/stock-photo-meeting-meetup-organization-text-concept-504799285.jpg" />
											)}
										</GridTile>
									))}
								</GridList>
							</div>;}
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