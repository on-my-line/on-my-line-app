import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import FlatButton from 'material-ui/FlatButton'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import firebase from '../../fire'
import store, { fetchSingleRouteThunk, fetchSingleStopsThunk, setLine } from '../store' 

const mapState = state => ({
  line: state.line
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
  }
})

class WhatIsYourLineAndStop extends React.Component {
  constructor() {
    super()
    this.state = {
      lines: []
    }
    this.handleLineChange = this.handleLineChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
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
    console.log('hello I changed')
    this.props.handleChange(event)
  }

  handleClick(){
    this.props.history.push(`/${this.props.line}`)
  }


  render() {
    return (
  <div className='center-screen'>
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
