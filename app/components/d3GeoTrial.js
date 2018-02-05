import * as topojson from "topojson-client"
import { withRouter } from "react-router"
import React, { Component } from "react"
import { NavLink } from 'react-router-dom'
import * as d3 from "d3"
import d3Tip from "d3-tip"
import { connect } from 'react-redux'
import { setStop, fetchYelpThunk, fetchMeetupThunk, fetchGoogleThunk } from '../store'



const mapStateToProps = state => ({ 
  meetup: state.meetup,
  yelp: state.yelp,
  google: state.google,
  singleRoute: state.singleRoute,
  singleTrainStops: state.singleTrainStops, 
  stop: state.stop
})

const mapDistpatchToProps = dispatch => {
  return{
    setCurrentStop: stop => dispatch(setStop(stop))
    ,
    fetchYelp(arrayOfStops, callback) {
      return dispatch(fetchYelpThunk(arrayOfStops, 400, callback))
    },
    fetchMeetup(arrayOfStops, callback){
      dispatch(fetchMeetupThunk(arrayOfStops, 400, callback))
    },
    fetchGoogle(arrayOfStops, callback){
      dispatch(fetchGoogleThunk(arrayOfStops, 400, callback))
    }
  }
}


class CongressionalDistrict extends Component {
  constructor(props) {
    super(props)
    this.handleEventClick = this.handleEventClick.bind(this)
    // this.handleDoubleClick = this.handleDoubleClick.bind(this)
    // this.handleZoom = this.handleZoom.bind(this)
  }

  handleEventClick(data, event) {
    let currentStop = data.stopId
    this.props.setCurrentStop(currentStop)
    this.props.history.push(
      `/${this.props.singleRoute[0].properties.route_id}/${data.stopId}/${event}/${data.id}`
    )
  }


  handleClick(data) {

    let currentStop = data.properties.STOP_ID
    this.props.setCurrentStop(currentStop)

    this.props.history.push(
      `/${this.props.singleRoute[0].properties.route_id}/${data.properties.STOP_ID}/`
    )
  }


  componentDidMount() {
    const node = this.node
    const mySelf = this
    const middleStop = Math.floor(this.props.singleTrainStops.length / 2)
    const center = this.props.singleTrainStops[middleStop].geometry.coordinates
    let centered, k
    // const width = 1280
    // const height = 2000
    const width = d3.select("#mapcontainer").node().clientWidth
    const height = d3.select("#mapcontainer").node().clientHeight

    let stopsTip = d3Tip()
      .attr("class", "stopsTip")
      .offset([-12, 0])
      .html(function(d) {
        return "<span style='color:black'>" + d.properties.STOP_NAME + "</span>"
      })

    let yelpTip = d3Tip()
      .attr("class", "yelpTip")
      .offset([-12, 0])
      .html(function(d) {
        let price = d.price || "<span/>"
        return `<span>${d.name}<br/><span style='color:rgba(253, 254, 254, 0.8)'>${d.category.slice(0, 2).join('/')}</span><br/>${d.price}&nbsp;&nbsp;&nbsp;<span style='color:#F7DC6F'>${d.rating}&nbsp;&nbsp;&#9733;</span></span>`
      })

    let meetupTip = d3Tip()
      .attr("class", "meetupTip")
      .offset([-12, 0])
      .html(function(d) {
        let price = d.price || "<span/>"
        return `<span style='color:black'>${d.name}</span><br><span>${d.date}</span><br/><span>${price}</span>`
      })


    const svg = d3
      .select(node)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "white")

    svg.call(stopsTip)
    .call(yelpTip)
    .call(meetupTip)

    const projection = d3
      .geoMercator()
      .scale(1) //will change with input
      .translate([0, 0])

    const path = d3.geoPath(projection)

    svg.selectAll("g").remove()

    let combinedRoute;
    if(this.props.singleRoute[0].geometry.type === "MultiLineString") {
      combinedRoute = this.props.singleRoute[0]
    } else {
      combinedRoute = {
        type: "Feature",
        geometry: { type: "LineString", coordinates: this.props.singleRoute.reduce((a, b) => [...a, ...b.geometry.coordinates],[])},
        properties: { Division: "IND", Line: "Crosstown", route_id: "G" }
      }
    }

    // geo.path.bounds() output [[left, bottom], [right, top]]
    let b = path.bounds(combinedRoute)
    let s = 0.9 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height)
    let t = [ (width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2 ]

    projection.scale(s).translate(t)

    const g = svg.append("g")

    let defs = g.append('g:defs')

    defs.append("svg:pattern")
    .attr("id", "restaurant")
    .attr("width", "2.2px")
    .attr("height", "2.2px")
    // .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr("xlink:href","images/place.svg")
    .attr("width", "2.2px")
    .attr("height", "2.2px")
    .attr("x", 0)
    .attr("y", 0)

    defs.append("svg:pattern")
    .attr("id", "yelpYellow")
    .attr("width", "2.2px")
    .attr("height", "2.2px")
    // .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr("xlink:href","images/place-yellow.svg")
    .attr("width", "2.2px")
    .attr("height", "2.2px")
    .attr("x", 0)
    .attr("y", 0)

    defs.append("svg:pattern")
    .attr("id", "location")
    .attr("width", "6px")
    .attr("height", "6px")
    // .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr("xlink:href","images/location.svg")
    .attr("width", "6px")
    .attr("height", "6px")
    .attr("x", 0)
    .attr("y", 0)

    defs.append("svg:pattern")
    .attr("id", "event")
    .attr("width", "2.5px")
    .attr("height", "2.5px")
    // .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr("xlink:href","images/event.svg")
    .attr("width", "2.5px")
    .attr("height", "2.5px")
    .attr("x", 0)
    .attr("y", 0)

    defs.append("svg:pattern")
    .attr("id", "eventHover")
    .attr("width", "2.5px")
    .attr("height", "2.5px")
    // .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr("xlink:href","images/event-hover.svg")
    .attr("width", "2.5px")
    .attr("height", "2.5px")
    .attr("x", 0)
    .attr("y", 0)

    d3.queue()
      .defer(d3.json, "nyc-streets.json")
      .awaitAll(function(error, results) {
      if (error) throw error

      const map = g
      .append("g")
      .attr("id", "nycBoroughs")
      .selectAll(".borough")
      .data(
      topojson.feature(
        mySelf.props.nycBoroughs,
        mySelf.props.nycBoroughs.objects["nyc-borough-boundaries-polygon"]
      ).features
      )

      map
      .enter()
      .append("path")
      .attr("d", path)

      const streetMap = g
      .append("g")
      .attr("id", "nycStreets")
      .selectAll(".nycStreets")
      .data(results[0].features)

      streetMap
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "#212121")
      .attr("stroke-width", "0.2")

      const routes = g
      .append("g")
      .attr("id", "routes")
      .selectAll(".route")
      .data(mySelf.props.singleRoute)

      routes
      .enter()
      .append("path")
      .attr("class", data => data.properties.route_id)
      .attr("d", path)
      .style("stroke", mySelf.props.color)
      .style("stroke-width", "6px")
      .style("fill", "none")

      const stops = g
      .append("g")
      .attr("id", "stops")
      .selectAll(".stops")
      .attr("class", "stops")
      .data(mySelf.props.singleTrainStops)

      stops
      .enter()
      .append("circle")
      .attr("cx", function(data) { return projection(data.geometry.coordinates)[0] })
      .attr("cy", function(data) { return projection(data.geometry.coordinates)[1] })
      .attr("fill", "rgba(255, 255, 255)")
      .on("mouseover", stopsTip.show)
      .on("mouseout", stopsTip.hide)
      .on("dblclick", (data) => mySelf.handleClick(data))
      .on("click", function(data) {
        let thisStop = this
        return clicked(data, thisStop)
      })
      .transition()
      .styleTween("r", () => d3.interpolate("0", "8")) //Async
      .styleTween("stroke", () => d3.interpolate("none", mySelf.props.color))
      .styleTween("stroke-width", () => d3.interpolate("0px", "3px"))
      .duration(750)

    })


    const mouseover = function() {
      d3
        .select(this)
        .transition()
        .style("r", "20")
        .style("stroke-width", "5px")
    }

    const mouseout = function() {
      d3
        .select(this)
        .transition()
        .style("r", "8")
        .style("stroke-width", "3px")
    }

    const clicked = function(d, thisStop) {
        d3.selectAll("g#stopName text").remove()
        d3.selectAll("g#location circle").remove()
      stopsTip.hide()
      var x, y, o, w, r
      if (d && centered !== d || centered === d && k === 1) {
        var centroid = path.centroid(d)
        x = projection(d.geometry.coordinates)[0]
        y = projection(d.geometry.coordinates)[1]
        k = 16
        o = 0.6
        w = 2
        r = 2
        centered = d

        d3.queue(2)
        .defer( (callback) => {
          mySelf.props.fetchYelp([{ coordinates: d.geometry.coordinates, stopId: d.properties.STOP_ID }], callback)
        })
        .defer( (callback) => {
          mySelf.props.fetchMeetup([{ coordinates: d.geometry.coordinates, stopId: d.properties.STOP_ID }], callback)
        })
        .defer( (callback) => {
          mySelf.props.fetchGoogle([{ coordinates: d.geometry.coordinates, stopId: d.properties.STOP_ID }], callback)
        })
        .awaitAll(function(error) {
          if (error) throw error

          const location = d3.select("g")
          .append("g")
          .attr("id", "location")
          .selectAll(".location")
          .data([d])
          .enter()
          .append("circle")
          .attr("cx", (d) => projection(d.geometry.coordinates)[0] + 40 )
          .attr("cy", (d) => projection(d.geometry.coordinates)[1] + 15 )
          .attr("dx", "-10px")
          .attr("dy", "-10px")
          .attr("r", "3")
          .attr("fill", "url(#location)")


          const stopName = d3.select("g")
          .append("g")
          .attr("id", "stopName")
          .selectAll(".yelp")
          .data([d])

          stopName
          .enter()
          .append("text")
          .attr("x", function(d) { return projection(d.geometry.coordinates)[0] + 4 })
          .attr("y", function(d) { return projection(d.geometry.coordinates)[1] - 8 })
          .attr("dx", "4px")
          .attr("dy", "-10px")
          .text( function (data) { return data.properties.STOP_NAME })
          .attr("font-size", "2px")
          .attr("fill", "#424949")

          const yelp = d3.select("g")
          .append("g")
          .attr("id", "yelp")
          .selectAll(".yelp")
          .data(mySelf.props.yelp)

          yelp
          .enter()
          .append("circle")
          .attr("class", "yelp")
          .attr("r", 0)
          .attr("fill", "url(#restaurant)")
          .attr("data-legend","Yelp")
          .on("mouseover", function(data) {
            yelpTip.show(data)
            d3.select(this)
            .transition()
            .attr("fill", "url(#yelpYellow)")
          })
          .on("mouseout", function(data) {
            yelpTip.hide(data)
            d3.select(this)
            .transition()
            .attr("fill", "url(#restaurant)")
          })
          .on("click", (data) => {
            yelpTip.hide()
            mySelf.handleEventClick(data, 'yelp')
          })
          .transition()
          .attr("transform", function(data) {
            return ( "translate(" + projection([data.lon, data.lat])[0] + "," + projection([data.lon, data.lat])[1] + ")")
          })
          .duration(750)
          .attr("r", 1.1)

          const meetup = d3.select("g")
          .append("g")
          .attr("id", "meetup")
          .selectAll(".meetup")
          .data(mySelf.props.meetup)

          meetup
          .enter()
          .append("circle")
          .attr("class", "meetup")
          .on("mouseover", function(data) {
            meetupTip.show(data)
            d3.select(this)
            .transition()
            .attr("fill", "url(#eventHover)")
          })
          .on("mouseout", function(data) {
            meetupTip.hide(data)
            d3.select(this)
            .transition()
            .attr("fill", "url(#event)")
          })
          .on("click", (data) => {
            meetupTip.hide()
            mySelf.handleEventClick(data, 'meetup')})
          .attr("cx", function(data) { return projection([data.lon, data.lat])[0] })
          .attr("cy", function(data) { return projection([data.lon, data.lat])[1] })
          .attr("fill", "url(#event)")
          .transition()
          .styleTween("r", () => d3.interpolate("0", "1.25"))
          .duration(750)
        })
      } else {
        x = width / 2
        y = height / 2
        k = 1
        o = 1
        w = 8
        r = 8

        d3.select(thisStop)
        .transition()
        .duration(1250)
        .attr("fill", "white")

        d3.selectAll("g#yelp circle").remove()
        d3.selectAll("g#meetup circle").remove()
      }

      g.selectAll("path").classed(
        "active",
        centered &&
          function(d) {
            return d === centered
          }
      )

      g.transition()
        .duration(750)
        .attr( "transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
          // .style("stroke-width", 0.02 / k + "px") 

      d3.selectAll("g#routes path")
        .transition()
        .duration(750)
        .style("stroke-opacity", o)
        .style("stroke-width", w  + "px")

      d3.selectAll("g#stops circle")
        .transition()
        .duration(750)
        .style("r", r)
        // .style("stroke-opacity", o)
        .style("stroke-width", w / 3  + "px")
    }
  }



  // componentWillReceiveProps(nextProps) {
  //     if (nextProps.singleRoute !== this.props.singleRoute) {
  //       this.renderMap(nextProps)
  //     }
  // }

  // shouldComponentUpdate () {
  //   return false
  // }

  render() {
    console.log("im on top of svg")
    return (
      <div>
        <svg ref={node => (this.node = node)} />
      </div>
    )
  }
}

const CongressionalDistricts = withRouter(connect(mapStateToProps,mapDistpatchToProps)(CongressionalDistrict))

export default CongressionalDistricts
