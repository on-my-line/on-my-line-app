import React, { Component } from 'react'

export default function SingleMeetupPage(props){
    console.log("CurrentThingL ", props.currentThing)
    const { currentThing } =  props
    return(
        <div>
            <h1>{currentThing.name}</h1>
            {(currentThing.description)?
                <div><h2>Description: </h2><div dangerouslySetInnerHTML={{__html: currentThing.description}}/></div> : ""
            }
            <h2>When: {currentThing.date}</h2>
            <h2>Start Time: {currentThing.start_time}</h2>
            {(currentThing.price)?
                <h3>Price: {currentThing.price}</h3>: ""
            }
            <img src={currentThing.img}/>
            {(currentThing.group)?
                <h2>Host: {currentThing.group}</h2> : ""
            }
            <h3>Address: {currentThing.location}</h3>
            <h3>Phone: {currentThing.phone}</h3>
            <h4><a href={currentThing.url}>Site</a></h4>
        </div>
    )
}
