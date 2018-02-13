import React from 'react'
import { connect } from 'react-redux'
import firebase from '../../fire'
import Hello from './Hello'
import WhatIsYourLine from './WhatIsYourLine'
import UserHome from './UserHome'

const mapState = state => ({user: state.user})

class HomeContainer extends React.Component {

  render() {
    return (
      <div className="center-screen fade">
        <Hello />
        {this.props.user.uid && <UserHome />}
        <WhatIsYourLine />
      </div>
    )
  }
}

const Home = connect(mapState)(HomeContainer)

export default Home