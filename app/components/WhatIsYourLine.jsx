import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import FlatButton from 'material-ui/FlatButton'
import {withRouter} from 'react-router-dom'
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
      selectLine: ''
    }
    this.handleLineChange = this.handleLineChange.bind(this)
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
  }

  handleClick(){
    this.props.history.push(`/${this.state.selectLine}`)
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
     href={`/${this.state.selectLine}`} />
     : null
    }
  </div>
    )
  }
}

const WhatIsYourLine = withRouter(connect(mapState, mapDispatch)(WhatIsYourLineAndStop))

export default WhatIsYourLine
