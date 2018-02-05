import React, { Component } from 'react'

export default function SingleGooglePage(props){
    console.log("CurrentThingL ", props.currentThing)
    const { currentThing } =  props
    return(
        <div>
            <h1>{currentThing.name}</h1>
            {(currentThing.Time)?
                <h2>Opening Times: {currentThing.time}</h2>: ""
            }
            <img src={currentThing.img}/>
            <h3>Address: {currentThing.location}</h3>
            <h3>Phone: {currentThing.phone}</h3>
            <h4><a href={currentThing.url} target="_blank">Site</a></h4>
        </div>
    )
}
