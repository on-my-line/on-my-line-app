import React from 'react'
import {connect} from 'react-redux'

const mapState = props => ({
    line: props.line
})

const Home = props => (
  <div className="centered">
    <WhatIsYourLine />
  </div>
)

const HomeContainer = connect(mapState)

export default HomeContainer
