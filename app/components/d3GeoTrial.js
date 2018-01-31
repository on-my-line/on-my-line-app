import * as topojson from "topojson-client"
import { withRouter } from "react-router"
import React, { Component } from "react"
import * as d3 from "d3"
import d3Tip from "d3-tip"
import { connect } from "react-redux"

const mapStateToProps = state => ({ 
  yelp: state.yelp,
  singleRoute: state.singleRoute,
  singleTrainStops: state.singleTrainStops })

class CongressionalDistrict extends Component {
  constructor(props) {
    super(props)
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
    // this.handleZoom = this.handleZoom.bind(this)
  }

  handleDoubleClick(data) {
        this.props.router.history.push(
          `/${this.props.singleRoute[0].properties.route_id}/${
            data.properties.STOP_ID
          }`
        )
    }


  componentDidUpdate() {

    const node = this.node
    const mySelf = this
    const middleStop = Math.floor(this.props.singleTrainStops.length / 2)
    const center = this.props.singleTrainStops[middleStop].geometry.coordinates
    let centered
    const width = 1280
    const height = 960

    // const width = d3.select("#mapcontainer").node().clientWidth
    // const height = d3.select("#mapcontainer").node().clientHeight

    var tip = d3Tip()
      .attr("class", "d3-tip")
      .offset([-12, 0])
      .html(function(d) {
        return "<span style='color:black'>" + d.properties.STOP_NAME + "</span>"
      })


    const svg = d3
      .select(node)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "white")

    //svg.call(tip)

    const projection = d3
      .geoMercator()
      .scale(1) //will change with input
      .translate([0, 0])

    const path = d3.geoPath(projection)

    svg.selectAll("g").remove()

    const combinedRoute = {
      type: "Feature",
      geometry: { type: "LineString", coordinates: this.props.singleRoute.reduce((a, b) => [...a, ...b.geometry.coordinates],[])},
      properties: { Division: "IND", Line: "Crosstown", route_id: "G" }
    }
    // geo.path.bounds() output [[left, bottom], [right, top]]
    let b = path.bounds(combinedRoute)
    let s = 0.9 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height)
    let t = [ (width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2 ]

    projection.scale(s).translate(t)

    const g = svg.append("g")

    const map = g
      .append("g")
      .attr("id", "nycBoroughs")
      .selectAll(".borough")
      .data(
        topojson.feature(
          this.props.nycBoroughs,
          this.props.nycBoroughs.objects["nyc-borough-boundaries-polygon"]
        ).features
      )

    map
      .enter()
      .append("path")
      .attr("d", path)

    const routes = g
      .append("g")
      .attr("id", "routes")
      .selectAll(".route")
      .data(this.props.singleRoute)

    routes
      .enter()
      .append("path")
      .attr("class", data => data.properties.route_id)
      .attr("d", path)
      .style("stroke", this.props.color)

    const stops = g
      .append("g")
      .attr("id", "stops")
      .selectAll(".stops")
      .attr("class", "stops")
      .data(this.props.singleTrainStops)

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

    const clicked = function(d) {
      var x, y, k
      if (d && centered !== d) {
        var centroid = path.centroid(d)
        x = projection(d.geometry.coordinates)[0]
        y = projection(d.geometry.coordinates)[1]
        k = 12
        centered = d
        g.selectAll("path").classed(
          "active",
          centered &&
            function(d) {
              return d === centered
            }
        )
      } else {
        x = width / 2
        y = height / 2
        k=1
      }

        g
          .transition()
          .duration(750)
          .attr(
            "transform",
            "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
          .style("stroke-width", 0.6 / k + "px")

        stops
          .on("dbclick", (data) => mySelf.handleDoubleClick(data))


        // const yelpData = mySelf.props.yelp.map(yelp => [yelp.lon, yelp.lat])

        // const yelp = g
        //   .append("g")
        //   .attr("id", "yelp")
        //   .selectAll(".yelp")
        //   .data(yelpData)

        // yelp
        //   .enter()
        //   .append("circle")
        //   .attr("class", "yelp")
        //   .attr("r", 0)
        //   .transition()
        //   .attr("transform", function(data) {
        //     return (
        //       "translate(" +
        //       projection(data)[0] +
        //       "," +
        //       projection(data)[1] +
        //       ")"
        //     )
        //   })
        //   .delay(1200)
        //   .duration(750)
        //   .attr("r", 2)
        //   .attr("fill", "#DC7633")
      
    }

    stops
      .enter()
      .append("circle")
      .attr("cx", function(data) {
        return projection(data.geometry.coordinates)[0]
      })
      .attr("cy", function(data) {
        return projection(data.geometry.coordinates)[1]
      })
      // .on("mouseover", tip.show)
      // .on("mouseout", tip.hide)
      .on("click", function(data) {
        return clicked(data)
      })
      .transition()
      .styleTween("r", () => d3.interpolate("0", "8")) //Async
      .styleTween("stroke", () => d3.interpolate("none", this.props.color))
      .styleTween("stroke-width", () => d3.interpolate("0px", "3px"))
      .duration(750)

    // const labels = g
    //   .append("g")
    //   .attr("id", "stopLabels")
    //   .selectAll(".stopLabels")
    //   .attr("class", "stopLabels")
    //   .data(this.props.singleTrainStops)

    // labels
    //   .enter()
    //   .append("text")
    //   .attr("x", function(data) { return projection(data.geometry.coordinates)[0] })
    //   .attr("y", function(data) { return projection(data.geometry.coordinates)[1] })
    //   .attr("dx", "2em")
    //   .attr("dy", "2em")
    //   .text(function(data) {
    //     return data.properties.STOP_NAME
    //   })
    //   .attr("fill", this.props.color)
    //   .attr("font-size", "12px")
    //   .attr("font-family", "Didot")
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
    return <svg ref={node => (this.node = node)} />

  }
}

const CongressionalDistricts = withRouter(connect(mapStateToProps)(CongressionalDistrict))

export default CongressionalDistricts
