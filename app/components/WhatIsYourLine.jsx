import React from 'react'
import SelectField from 'material-ui/SelectField'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
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
    if(this.props.line) {
    auth.onAuthStateChanged(user => {
      if(user && !user.isAnonymous) {
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
    }
    this.props.history.push(`/${this.props.line}`)
  }



  render() {
    const items = [];
    for (let i = 0; i < this.state.lines.length; i++ ) {
      items.push(<MenuItem value={i} key={i} primaryText={this.state.lines[i]} />);
    }

    return (
      
  <div className='center-screen fade'>
     { this.props.userLine ? "Or go elsewhere ..." : null }
    <SelectField
        className="fade"
        name="line"
        value={this.state.selectLine}
        onChange={this.handleLineChange}
        maxHeight={200}
      >
        {items}
    </SelectField>
    <FlatButton label="Let's go!" 
      onClick={this.handleClick} 
    />
  </div>
    )
  }
}

const WhatIsYourLine = withRouter(connect(mapState, mapDispatch)(WhatIsYourLineAndStop))

export default WhatIsYourLine
