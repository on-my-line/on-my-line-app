import React, { Component } from 'react'
import { GridList, GridTile } from "material-ui/GridList";
import Subheader from 'material-ui/Subheader/Subheader';

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		textAlign: "center"
	},
	gridList: {
		width: 500,
		height: "auto",
		overflowY: "auto"
	}
};


export default function SingleMeetupPage(props){
    console.log("CurrentThingL ", props.currentThing)
    const { currentThing } =  props
    return 
        <div>
		    <h1><a href={currentThing.url}>{currentThing.name}</a></h1>
			{currentThing.group ? <h2>Host: {currentThing.group}</h2> : ""}
			<img src={currentThing.img ? currentThing.img : "https://thumb7.shutterstock.com/display_pic_with_logo/2117717/504799285/stock-photo-meeting-meetup-organization-text-concept-504799285.jpg"} />
            {currentThing.price ? <h3>$: {currentThing.price}</h3> : ""}
            {<h2>where: {currentThing.location}</h2>}
			{<h2>When: {currentThing.date}</h2>}
			{<h2>Start Time: {currentThing.start_time}</h2>}
			{currentThing.description ? <div><h2>Description: </h2>
			<div dangerouslySetInnerHTML={{ __html: currentThing.description }} />
			</div> : ""}
			{currentThing.phone? <h2>phone: {currentThing.phone}</h2> : ""}
		</div>
}
