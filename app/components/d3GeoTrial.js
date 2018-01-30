import * as topojson from 'topojson-client'
import React, { Component } from 'react'
import * as d3 from 'd3'


export default class CongressionalDistricts extends Component {
    constructor(props) {
      super(props)
    }

    // componentDidUpdate() {
    //   this.renderMap()
    // }

    componentDidUpdate() {

        const node = this.node

        const middleStop = Math.floor(this.props.singleTrainStops.length/2)
        const center = this.props.singleTrainStops[middleStop].geometry.coordinates
        console.log(center)

        const svg = d3.select(node)
                      .attr('width', this.props.width)
                      .attr('height', this.props.height)
                      .attr('fill', 'white')

        const projection = d3.geoMercator()
                              .center(center)//will change with input
                              .scale(400000)//will change with input
                              .translate([this.props.width / 2, this.props.height / 2])

        const path = d3.geoPath(projection)

        svg.selectAll('g').remove()

        console.log(d3.select('#mapcontainer').width())

        const map = svg
        .append('g')
        .attr('id', 'nycBoroughs')
        .attr('transform', 'rotate(-27)')
        .selectAll('.borough')
        .data(topojson.feature(this.props.nycBoroughs, this.props.nycBoroughs.objects['nyc-borough-boundaries-polygon']).features)

        map
        .enter()
        .append('path')
        .attr('d', path)

        const routes = svg
        .append('g')
        .attr('id', 'routes')
        .attr('transform', 'rotate(-27)')
        .selectAll('.route')
        .data(this.props.singleRoute)

        routes
        .enter()
        .append('path')
        .attr('class', (data) => data.properties.route_id)
        .attr('d', path)
        .style('stroke', this.props.color)

        const stops = svg
        .append('g')
        .attr('id', 'stops')
        .attr('transform', 'rotate(-27)')
        .selectAll('.stops')
        .attr('class', 'stops')
        .data(this.props.singleTrainStops)
        
        stops
        .enter()
        .append('circle')
        .attr('cx', function(data) {return projection(data.geometry.coordinates)[0]})
        .attr('cy', function(data) {return projection(data.geometry.coordinates)[1]})
        .attr('xlink:href', function(data) {return })
        .text('text', (data) => data.properties.STOP_NAME)
        .transition()
        .styleTween('r', () => d3.interpolate('0', '5'))//Async
        .styleTween('stroke', () => d3.interpolate('none', this.props.color)) 
        .styleTween('stroke-width', () => d3.interpolate('0px', '2px')) 
        .duration(750)

        // const dummy = svg
        // .append('g')
        // .attr('id', 'dummy')
        // .attr('transform', 'rotate(-27)')
        // .selectAll('.dummy')
        // .attr('class', 'dummy')
        // .data(props.dummy)

        // dummy
        // .enter()
        // .append('circle')
        // .attr('r', 0)
        // .attr("transform", function(data) { return "translate(" + projection(data)[0] + "," + projection(data)[1] + ")"})
        // .transition()
        // .delay(1200)
        // .duration(750)
        // .attr('r', 5)
        // .attr('fill', '#DC7633')

        // const labels = svg
        // .append('g')
        // .attr('transform', 'rotate(-27)')
        // .attr('id', 'stopLabels')
        // .selectAll('.stopLabels')
        // .attr('class', 'stopLabels')
        // .data(props.singleTrainStops)

        // labels
        // .enter()
        // .append('text')
        // .attr('x', function(data) {return projection(data.geometry.coordinates)[0]})
        // .attr('y', function(data) {return projection(data.geometry.coordinates)[1]})
        // .attr("dx", "2em")
        // .attr("dy", "2em")
        // .text(function(data) { return data.properties.STOP_NAME })
        // .attr('fill', props.color)
        // .attr('font-size', '12px')
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
      console.log('im on top of svg')
        return <svg ref={node => this.node = node} />;
    }
}
