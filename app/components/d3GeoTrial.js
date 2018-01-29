import * as topojson from 'topojson-client'
import React, { Component } from 'react'
import * as d3 from 'd3'


export default class CongressionalDistricts extends Component {
    constructor(props) {
      super(props)
    }

    componentDidUpdate() {
      this.renderMap()
    }

    renderMap(props) {

        const node = this.node

        const svg = d3.select(node)
                      .attr('width', props.width)
                      .attr('height', props.height)
                      .attr('fill', 'white')

        const projection = d3.geoMercator()
                              .center([-73.80, 40.75])//will change with input
                              .scale(30000)//will change with input
                              .translate([props.width / 2, props.height / 2])

        const path = d3.geoPath(projection)

        svg.selectAll('g').remove()
        console.log(props.nycBoroughs)
        const map = svg
        .append('g')
        .attr('id', 'nycBoroughs')
        .attr('transform', 'rotate(-27)')
        .selectAll('.borough')
        .data(topojson.feature(props.nycBoroughs, props.nycBoroughs.objects['nyc-borough-boundaries-polygon']).features)

        map
        .enter()
        .append('path')
        .attr('d', path)

        const routes = svg
        .append('g')
        .attr('id', 'routes')
        .attr('transform', 'rotate(-27)')
        .selectAll('.route')
        .data(props.singleRoute)

        routes
        .enter()
        .append('path')
        .attr('class', (data) => data.properties.route_id)
        .attr('d', path)
        .style('stroke', props.color)

        const stops = svg
        .append('g')
        .attr('id', 'stops')
        .attr('transform', 'rotate(-27)')
        .selectAll('.stops')
        .attr('class', 'stops')
        .data(props.singleTrainStops)
        console.log(props.color)
        stops
        .enter()
        .append('circle')
        .attr('cx', function(data) {return projection(data.geometry.coordinates)[0]})
        .attr('cy', function(data) {return projection(data.geometry.coordinates)[1]})
        .text('text', (data) => data.properties.STOP_NAME)
        .transition()
        .styleTween('r', () => d3.interpolate('0', '8'))//Async
        .styleTween('stroke', () => d3.interpolate('none', props.color)) 
        .styleTween('stroke-width', () => d3.interpolate('0px', '3px')) 
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.singleRoute !== this.props.singleRoute) {
          this.renderMap(nextProps)
        }
    }

    shouldComponentUpdate () {
      return false
    }

    render() {
      console.log(this.props.singleTrainStops)
        return <svg ref={node => this.node = node} />;
    }
}
