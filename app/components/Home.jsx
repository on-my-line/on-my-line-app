import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {default as WhatIsYourLine} from './WhatIsYourLine'
import {default as WhatIsYourStop} from './WhatIsYourStop'

const mapState = (state, ownProps) => ({
    line: state.line,
    stop: state.stop,
    ownProps: ownProps
})

const Home = props => (
  <div className="center-screen">
    <WhatIsYourLine />
    {props.line ?
    <WhatIsYourStop /> : null}
    {props.line && props.stop ?
    props.ownProps.history.push('/')
    : null}
  </div>
)

const HomeContainer = connect(mapState)(Home)

export default HomeContainer
