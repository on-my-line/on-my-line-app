import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import FlatButton from 'material-ui/FlatButton'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import firebase from '../../fire'
import store, { fetchSingleRouteThunk, fetchSingleStopsThunk, setLine, setUserLine } from '../store' 
import UserLineContainer from './UserLine'
const auth = firebase.auth()

const mapState = state => ({
  line: state.line,
  userLine: state.userLine
})

const mapDispatch = dispatch => ({
  handleChange: value => {
    dispatch(setLine(value))
  },
  fetchSingleRoute: currentRoute => {
    dispatch(fetchSingleRouteThunk(currentRoute))
  },
  fetchSingleStops: currentRoute => {
    dispatch(fetchSingleStopsThunk(currentRoute))
  },
  addUserLine: line => {
    dispatch(setUserLine(line))
  }

})

class WhatIsYourLineAndStop extends React.Component {
  constructor() {
    super()
    this.state = {
      lines: [],
      userLine: ''
    }
    this.handleLineChange = this.handleLineChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

//TODO PLACE FIREBASE LOGIC IN REFS FILE 

  componentWillMount() {
    let lines = []
    firebase
      .database()
      .ref('Lines')
      .once('value')
      .then(snapshot => {
        for (let keys in snapshot.val()) {
          lines.push(keys)
        }
        this.setState({lines: lines})
      })
      .catch(console.error)
      
  }

  handleLineChange(event) {
    this.props.handleChange(event)
  }

  handleClick(){
    auth.onAuthStateChanged(user => {
      if(user) {
          firebase.database().ref(`Users/${user.uid}`)
          .set({line:` ${this.props.line}`})
          .then(() => {
            firebase.database()
            .ref(`Users/${user.uid}/line`)
            .once('value')
            .then(lineVal => this.props.addUserLine(lineVal.val()))
          })
      }
    })
    this.props.history.push(`/${this.props.line}`)
  }


  render() {
    return (
  <div className='center-screen fade'>
     { this.props.userLine ? "Or go elsewhere ..." : null }
    <AutoComplete
      className="fade"
      floatingLabelText="What is your line?"
      filter={AutoComplete.fuzzyFilter}
      dataSource={this.state.lines}
      maxSearchResults={5}
      name="line"
      value={this.state.selectLine}
      onNewRequest={this.handleLineChange}
    />
    { this.state.selectLine !== '' ? 
     <FlatButton label="Let's go!" 
     onClick={this.handleClick} 
     />
     : null
    }
  </div>
    )
  }
}

const WhatIsYourLine = withRouter(connect(mapState, mapDispatch)(WhatIsYourLineAndStop))

export default WhatIsYourLine
