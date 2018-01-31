import * as topojson from "topojson-client"
import { withRouter } from "react-router"
import React, { Component } from "react"
import * as d3 from "d3"
import { connect } from 'react-redux'

const mapStateToProps = state => ({ 
  yelp: state.yelp,
  singleRoute: state.singleRoute,
  singleTrainStops: state.singleTrainStops })


class CongressionalDistrict extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(data) {
    this.props.router.history.push(
      `/${this.props.singleRoute[0].properties.route_id}/${
        data.properties.STOP_ID
      }`
    )
  }

  componentDidMount() {
    const node = this.node
    const middleStop = Math.floor(this.props.singleTrainStops.length / 2)
    const center = this.props.singleTrainStops[middleStop].geometry.coordinates

    const self = this

    const svg = d3
      .select(node)
      .attr("width", this.props.width)
      .attr("height", this.props.height)
      .attr("fill", "white")

    const projection = d3
      .geoMercator()
      .center(center) //will change with input
      .scale(400000) //will change with input
      .translate([this.props.width / 2, this.props.height / 2])

    const path = d3.geoPath(projection)

    svg.selectAll("g").remove()

    const map = svg
      .append("g")
      .attr("id", "nycBoroughs")
      .attr("transform", "rotate(-27)")
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

    const routes = svg
      .append("g")
      .attr("id", "routes")
      .attr("transform", "rotate(-27)")
      .selectAll(".route")
      .data(this.props.singleRoute)

    //console.log(d3.select("#mapcontainer").clientWidth)

    routes
      .enter()
      .append("path")
      .attr("class", data => data.properties.route_id)
      .attr("d", path)
      .style("stroke", this.props.color)

    const stops = svg
      .append("g")
      .attr("id", "stops")
      .attr("transform", "rotate(-27)")
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
        .style("r", "5")
        .style("stroke-width", "3px")
    }

    stops
      .enter()
      .append("a")
      //.attr('xlink:href', (data) => ( `/${this.props.singleRoute[0].properties.route_id}/${data.properties.STOP_ID}`))
      .append("circle")
      .attr("cx", function(data) {
        return projection(data.geometry.coordinates)[0]
      })
      .attr("cy", function(data) {
        return projection(data.geometry.coordinates)[1]
      })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("click", function(data) {
        return self.handleClick(data)
      }) ///SIERRA SAITTA
      .transition()
      .styleTween("r", () => d3.interpolate("0", "8")) //Async
      .styleTween("stroke", () => d3.interpolate("none", this.props.color))
      .styleTween("stroke-width", () => d3.interpolate("0px", "3px"))
      .duration(750)

    stops
      .enter()
      .append("a")
      .attr(
        "xlink:href",
        data =>
          `/${this.props.singleRoute[0].properties.route_id}/${
            data.properties.STOP_ID
          }`
      )
      .append("circle")
      .attr("cx", function(data) {
        return projection(data.geometry.coordinates)[0]
      })
      .attr("cy", function(data) {
        return projection(data.geometry.coordinates)[1]
      })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .transition()
      .styleTween("r", () => d3.interpolate("0", "8")) //Async
      .styleTween("stroke", () => d3.interpolate("none", this.props.color))
      .styleTween("stroke-width", () => d3.interpolate("0px", "3px"))
      .duration(750)


    const yelpData = this.props.yelp.map(yelp => [yelp.lon, yelp.lat])

    const yelp = svg
    .append('g')
    .attr('id', 'yelp')
    .attr('transform', 'rotate(-27)')
    .selectAll('.yelp')
    .attr('class', 'yelp')
    .data(yelpData)

    yelp
    .enter()
    .append('circle')
    .attr('r', 0)
    .attr("transform", function(data) { return "translate(" + projection(data)[0] + "," + projection(data)[1] + ")"})
    .transition()
    .delay(1200)
    .duration(750)
    .attr('r', 2)
    .attr('fill', '#DC7633')

    const labels = svg
      .append("g")
      .attr("transform", "rotate(-27)")
      .attr("id", "stopLabels")
      .selectAll(".stopLabels")
      .attr("class", "stopLabels")
      .data(this.props.singleTrainStops)

    labels
      .enter()
      .append("text")
      .attr("x", function(data) {
        return projection(data.geometry.coordinates)[0]
      })
      .attr("y", function(data) {
        return projection(data.geometry.coordinates)[1]
      })
      .attr("dx", "2em")
      .attr("dy", "2em")
      .text(function(data) {
        return data.properties.STOP_NAME
      })
      .attr("fill", this.props.color)
      .attr("font-size", "12px")
      .attr("font-family", "Didot")
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
    //console.log("im on top of svg")
    return <svg ref={node => (this.node = node)} />
  }
}

const CongressionalDistricts = withRouter(connect(mapStateToProps)(CongressionalDistrict))

export default CongressionalDistricts
