import React from 'react'
import SelectField from 'material-ui/SelectField'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import firebase from '../../fire'
import store, { fetchSingleRouteThunk, fetchSingleStopsThunk, setLine, setUserLine } from '../store' 
const auth = firebase.auth()

const mapState = state => ({ userLine: state.userLine})

const mapDispatch = dispatch => ({
  handleChange: value => {
    dispatch(setUserLine(value))
  },
  fetchSingleRoute: currentRoute => {
    dispatch(fetchSingleRouteThunk(currentRoute))
  },
  fetchSingleStops: currentRoute => {
    dispatch(fetchSingleStopsThunk(currentRoute))
  },
  addUserLine: line => {
    dispatch(setUserLine(line))
  },
  setCurrentLine: line => {
    dispatch(setLine(line))
  }
})

class WhatIsYourLineAndStop extends React.Component {
  constructor() {
    super()
    this.state = {
      lines: ["1", "2", "3", "4", "5", "6", "7", "A", "B", "C", "D", "E", "F", "G", "J", "L", "M", "N", "Q", "R", "S", "W", "Z"],
      userLine: 0
    }
    this.handleLineChange = this.handleLineChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

//TODO PLACE FIREBASE LOGIC IN REFS FILE 

  handleLineChange(event, index, value) {
    this.setState({userLine: value})
    this.props.setCurrentLine(event.target.innerHTML)
  }

  handleClick(){
    if(this.props.line) {
    auth.onAuthStateChanged(user => {
      if(user && !user.isAnonymous) {
          firebase.database().ref(`Users/${user.uid}`)
          .update({Line:` ${this.state.userLine}`})
          .then(() => {
            firebase.database()
            .ref(`Users/${user.uid}/line`)
            .once('value')
            .then(lineVal => this.props.addUserLine(lineVal.val()))
          })
      }
    })
    }

    this.props.history.push(`/${this.state.userLine}`)
  }



  render() {
    return (
      <div className='center-screen fade'>
        { this.props.userLine ? "Or go elsewhere ..." : null }
        <SelectField
            className="fade"
            name="line"
            floatingLabelText="Where to go..."
            value={this.state.userLine}
            onChange={this.handleLineChange}
            maxHeight={200}
          >
            {this.state.lines.map(line => <MenuItem value={line} key={line} primaryText={line} />)}
        </SelectField>
        {this.state.userLine ?
        <FlatButton label="Let's go!" 
          onClick={this.handleClick()} 
        />
        :
        null }
      </div>
    )
  }
}

const WhatIsYourLine = withRouter(connect(mapState, mapDispatch)(WhatIsYourLineAndStop))

export default WhatIsYourLine
