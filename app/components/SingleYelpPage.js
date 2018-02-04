import React, { Component } from 'react'


export default function SingleYelpPage(props){
    console.log("CurrentThingL ", props.currentThing)
    const { currentThing } =  props
    return(
        <div>
            <h1><a href={currentThing.url}>{currentThing.name}</a></h1>
            {currentThing.rating? <h2>Rating: {currentThing.rating}</h2> : "" }
            {currentThing.price? <h2>Price: {currentThing.price}</h2> : "" }
            {currentThing.category.map(type => {
                return <p key={type}>#{type}</p>
            })}
            {currentThing.img? <img src={currentThing.img}/> : <img src=""/>}
            <h3>Address: {currentThing.location}</h3>
            <h3>Phone: {currentThing.phone}</h3>
        </div>
    )
}

