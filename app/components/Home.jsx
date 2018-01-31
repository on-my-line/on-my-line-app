import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import WhatIsYourLine from './WhatIsYourLine'
import WhoAmI from './WhoAmI'


const Home = props => (
  <div className="center-screen">
    <WhatIsYourLine />
    <WhoAmI />
  </div>
)

export default Home