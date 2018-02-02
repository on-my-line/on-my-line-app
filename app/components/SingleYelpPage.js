import React, { Component } from 'react'

export default function SingleYelpPage(props){
    console.log("CurrentThingL ", props.currentThing)
    const { currentThing } =  props
    return(
        <div>
            <h1>{currentThing.name}</h1>
            <h2>Rating: {currentThing.rating}</h2>
            <h2>Price: {currentThing.price}</h2>
            {currentThing.category.map(category => {
                <h3>{category}</h3>
            })
            }    
            <img src={currentThing.img}/>
            <h3>Address: {currentThing.location}</h3>
            <h3>Phone: {currentThing.phone}</h3>
            <h4><a href={currentThing.url}>Site</a></h4>
        </div>
    )
}

