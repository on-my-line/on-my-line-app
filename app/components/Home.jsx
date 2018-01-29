import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import WhatIsYourLine from './WhatIsYourLine'

const mapState = (state, ownProps) => ({
    line: state.line,
    stop: state.stop,
    ownProps: ownProps
})

const Home = props => (
  <div className="center-screen">
    <WhatIsYourLine />
  </div>
)

const HomeContainer = connect(mapState)(Home)

export default HomeContainer
