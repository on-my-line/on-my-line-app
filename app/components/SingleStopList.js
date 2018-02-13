import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { GridList, GridTile } from 'material-ui/GridList'
import { blue500, red500, greenA200 } from 'material-ui/styles/colors'
import SvgIcon from 'material-ui/SvgIcon'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around"
	},
	gridList: {
		width: 500,
		height: "auto",
		overflowY: "auto"
	}
};


const mapState = state => ({
	line: state.line,
	stop: state.stop,
	yelp: state.yelp,
	meetup: state.meetup,
	google: state.google,
	singleRoute: state.singleRoute,
	singleTrainStops: state.singleTrainStops
})

class SingleStopList extends Component {
	
	render() {
		if (this.props.singleTrainStops) {
			const { stop, singleTrainStops, line } = this.props
			let singleStop = singleTrainStops.filter(currentStop => {
				return currentStop.properties.STOP_ID === stop
			})
			let yelpThings = this.props.yelp.filter(thing => {
				return thing.stopId === stop
			})
			let meetupThings = this.props.meetup.filter(thing => {
				return thing.stopId === stop
			})
			// let googleThings = this.props.google.filter(thing => {
			// 	return thing.stopId === stop
			// })
			return <div style={styles.root}>
					<GridList cellHeight={180} style={styles.gridList}>
						<Subheader>
							{`Things to do near: ${singleStop[0].properties.STOP_NAME}`}
						</Subheader>
						{yelpThings.map(thing => (
							<GridTile
								key={thing.id}
								title={thing.name}
								subtitle={<span>Rating: {thing.rating}</span>}
								actionIcon={
									<IconButton>
										<StarBorder color="white" />
									</IconButton>
								}
							>
								<Link to={`/${line}/${stop}/yelp/${thing.id}`}>
									{thing.img ? (
										<img src={thing.img} />
									) : (
										<img src="https://yt3.ggpht.com/a-/AK162_53TCkRV0sl6Bx6OpTBE49CVTtyNoJyazMZFg=s900-mo-c-c0xffffffff-rj-k-no" />
									)}
								</Link>
							</GridTile>
						))}
						{meetupThings.map(thing => (
							<GridTile
								key={thing.id}
								title={thing.name}
								subtitle={<span>When: {thing.date}</span>}
								actionIcon={
									<IconButton>
										<StarBorder color="white" />
									</IconButton>
								}

							>
								<Link to={`/${line}/${stop}/meetup/${thing.id}`}>
									{thing.img ? (
										<img src={thing.img} />
									) : (
										<img src="http://mikeschinkel.com/images/meetup-logo-300x220.jpg" />
									)}
								</Link>
							</GridTile>
						))}
						{/*{googleThings.map(thing => (
							<GridTile
								key={thing.id}
								title={thing.name}
								actionIcon={
									<IconButton>
										<StarBorder color="white" />
									</IconButton>
								}
							>
								<Link to={`/${line}/${stop}/google/${thing.id}`}>
									{thing.img ? (
										<img src={thing.img} />
									) : (
										<img src="https://yt3.ggpht.com/a-/AK162_53TCkRV0sl6Bx6OpTBE49CVTtyNoJyazMZFg=s900-mo-c-c0xffffffff-rj-k-no" />
									)}
								</Link>
							</GridTile>
						))}*/}
					</GridList>
				</div>
		} else {
			return <div>Loading</div>;
		}
	}
}

export default withRouter(connect(mapState)(SingleStopList))
