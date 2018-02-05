import React from 'react'
import SelectField from 'material-ui/SelectField'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import firebase from '../../fire'
import store, { fetchSingleRouteThunk, fetchSingleStopsThunk, setLine, setUserLine } from '../store' 
const auth = firebase.auth()

<<<<<<< HEAD
const mapState = state => ({ userLine: state.userLine})
=======

const mapState = state => ({
  userLine: state.userLine,
  line: state.line,
})
>>>>>>> e276f718d27099d59b24a3e0ea5099066472c7df

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

<<<<<<< HEAD
  handleLineChange(event, index, value) {
    this.setState({userLine: value})
=======
  componentWillMount() {
    // let lines = []
    // firebase
    //   .database()
    //   .ref('Lines')
    //   .once('value')
    //   .then(snapshot => {
    //     for (let keys in snapshot.val()) {
    //       lines.push(keys)
    //     }
    //     this.setState({lines: lines})
    //   })
    //   .catch(console.error)
      
  }

  handleLineChange(event) {
>>>>>>> e276f718d27099d59b24a3e0ea5099066472c7df
    this.props.setCurrentLine(event.target.innerHTML)
    //this.setState({userLine:value})
  }

  handleClick(){
    console.log("YOURE IN THE CLICK")
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
<<<<<<< HEAD
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
=======
        <div className='center-screen fade'>
           { this.props.line ? "Or go elsewhere ..." : null }
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
          {this.props.line ? 
            <FlatButton onClick={this.handleClick} label="Let's go!"
            />: null
          }
        </div>
>>>>>>> e276f718d27099d59b24a3e0ea5099066472c7df
    )
  }
}

const WhatIsYourLine = withRouter(connect(mapState, mapDispatch)(WhatIsYourLineAndStop))

export default WhatIsYourLine
