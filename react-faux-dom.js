import * as topojson from 'topojson-client'
import React, { Component } from 'react'
import * as d3 from 'd3'
import ReactFauxDOM from 'react-faux-dom'


export default class CongressionalDistricts extends Component {
  constructor(){
  super()
  //put geojson in backend,
  //map
  this.state = {}
  }

   render() {
        const someDiv = new ReactFauxDOM.Element('div')
        const middleStop = Math.floor(this.props.singleTrainStops.length/2)
        const center = this.props.singleTrainStops[middleStop].geometry.coordinates

        const svg = d3.select(someDiv)
                      .append("svg")
                      .attr('width', this.props.width)
                      .attr('height', this.props.height)
                      .attr('fill', 'white')

        const projection = d3.geoMercator()
                              .center(center)//will change with input
                              .scale(400000)//will change with input
                              .translate([this.props.width / 2, this.props.height / 2])

        const path = d3.geoPath(projection)

        svg.selectAll('g').remove()

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
        .style('stroke', this.state.color)
        .on('mousemove', function() {
          console.log(d3.event.layerX, d3.event.layerY)
        })
        .on('mousedown', function() {
          console.log('I AM LISTENING TO YOUR EVENT')
        })

        const stops = svg
        .append('g')
        .attr('id', 'stops')
        .attr('transform', 'rotate(-27)')
        .selectAll('.stops')
        .attr('class', 'stops')
        .data(this.props.singleTrainStops)


        const mouseover = function() {
          d3.select(this)
          .transition()
          .style('r', '20')
          .style('stroke-width', '5px')
        }

        const mouseout = function() {
          d3.select(this)
          .transition()
          .style('r', '5')
          .style('stroke-width', '3px')
        }


        stops
        .enter()
        .append('a')
        .attr('xlink:href', (data) => ( `/${this.props.singleRoute[0].properties.route_id}/${data.properties.STOP_ID}`))
        .append('circle')
        .attr('cx', function(data) {return projection(data.geometry.coordinates)[0]})
        .attr('cy', function(data) {return projection(data.geometry.coordinates)[1]})
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .transition()
        .styleTween('r', () => d3.interpolate('0', '8'))//Async
        .styleTween('stroke', () => d3.interpolate('none', this.props.color)) 
        .styleTween('stroke-width', () => d3.interpolate('0px', '3px')) 
        .duration(750)

        const labels = svg
        .append('g')
        .attr('transform', 'rotate(-27)')
        .attr('id', 'stopLabels')
        .selectAll('.stopLabels')
        .attr('class', 'stopLabels')
        .data(this.props.singleTrainStops)

        labels
        .enter()
        .append('text')
        .attr('x', function(data) {return projection(data.geometry.coordinates)[0]})
        .attr('y', function(data) {return projection(data.geometry.coordinates)[1]})
        .attr("dx", "2em")
        .attr("dy", "2em")
        .text(function(data) { return data.properties.STOP_NAME })
        .attr('fill', this.props.color)
        .attr('font-size', '12px')
        .attr('font-family', 'Didot')

        return someDiv.toReact()
    }

}

