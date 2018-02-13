import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from '../../fire'
import store, { fetchSingleRouteThunk, fetchSingleStopsThunk, setLine, setUserLine, setSingleRoute, setSingleStops } from '../store' 
import SelectField from 'material-ui/SelectField'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'

const auth = firebase.auth()

const mapState = state => ({
  userLine: state.userLine,
  line: state.line,
})

const mapDispatch = dispatch => ({
  handleChange: value => { dispatch(setUserLine(value)) },
  fetchSingleRoute: currentRoute => { dispatch(fetchSingleRouteThunk(currentRoute)) },
  fetchSingleStops: currentRoute => { dispatch(fetchSingleStopsThunk(currentRoute)) },
  addUserLine: line => { dispatch(setUserLine(line)) },
  setCurrentLine: line => { dispatch(setLine(line)) },
  resetSingleRoute: () => { dispatch(setSingleRoute([])) },
  resetSingleStops: () => { dispatch(setSingleStops([])) }
})

class WhatIsYourLineAndStop extends Component {
  constructor() {
    super()
    this.state = {
      lines: ["1", "2", "3", "4", "5", "6", "7", "A", "B", "C", "D", "E", "F", "G", "J", "L", "M", "N", "Q", "R", "S", "W", "Z"],
      userLine: 0
    }
    this.handleLineChange = this.handleLineChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.resetSingleStops()
    this.props.resetSingleRoute()
  }

  handleLineChange(event) {
    this.props.setCurrentLine(event.target.innerHTML)
  }

  handleClick(){
    if(this.props.line) {
    auth.onAuthStateChanged(user => {
      if(user && !user.isAnonymous) {
          firebase.database().ref(`Users/${user.uid}`)
          .update({Line:` ${this.props.line}`})
          .then(() => {
            firebase.database()
            .ref(`Users/${user.uid}/line`)
            .once('value')
            .then(lineVal => this.props.addUserLine(lineVal.val()))
          })
      }
    })
    }

    this.props.history.push(`/${this.props.line}`)
  }

  render() {
    return (
        <div className='center-screen fade'>
          <SelectField
              className="fade"
              name="line"
              floatingLabelText="Where to go..."
              value={this.props.line}
              onChange={event => this.handleLineChange(event)}
              maxHeight={200}
          >
              {this.state.lines.map(line => <MenuItem value={line} key={line} primaryText={line} />)}
          </SelectField>
          {this.props.line && <FlatButton onClick={this.handleClick} label="Let's go!"/>}
        </div>
    )
  }
}

const WhatIsYourLine = withRouter(connect(mapState, mapDispatch)(WhatIsYourLineAndStop))
export default WhatIsYourLine
