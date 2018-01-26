import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import {connect} from 'react-redux'
import {setLine} from '../store'
import firebase from '../../fire'

const mapState = state => ({
  line: state.line
})

const mapDispatch = dispatch => ({
  handleChange: value => {
    dispatch(setLine(value))
  }
})

class WhatIsYourLineAndStop extends React.Component {
  constructor() {
    super()
    this.state = {
      lines: [],
      stops: [],
      selectStop: '',
      selectLine: ''
    }
    this.handleLineChange = this.handleLineChange.bind(this)
    this.handleStopChange = this.handleStopChange.bind(this)
  }

  componentDidMount() {
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
      .then(x => console.log('LINES:', this.state.lines))
      .catch(console.error)
  }

  handleLineChange(event) {
    this.setState({selectLine: event})
    let stops = []
    firebase
      .database()
      .ref(`Lines/${event}`)
      .once('value')
      .then(snapshot => {
        for (let keys in snapshot.val()) {
          stops.push(keys)
        }
        this.setState({stops: stops})
      })
      .then(x => console.log('STOPS:', this.state.stops))
      .catch(console.error)
  }

  handleStopChange(event) {
    this.setState({selectStop: event})
  }

  render() {
    return (
  <div>
    <AutoComplete
      className="centered-screen fade"
      floatingLabelText="What is your line?"
      filter={AutoComplete.fuzzyFilter}
      dataSource={this.state.lines}
      maxSearchResults={5}
      name="line"
      value={this.state.selectLine}
      onNewRequest={this.handleLineChange}
    />
    <br />
    {this.state.selectLine !== '' ?
          <AutoComplete
          className="centered-screen fade"
          floatingLabelText="What is your stop?"
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.stops}
          maxSearchResults={5}
          name="stop"
          value={this.state.selectStop}
          onNewRequest={this.handleStopChange}
        />
      : null}
  </div>
    )
  }
}

const WhatIsYourLineAndStopContainer = connect(mapState, mapDispatch)(WhatIsYourLineAndStop)

export default WhatIsYourLineAndStopContainer
