import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import {connect} from 'react-redux'
import {setStop} from '../store'

const stops = ['A', 'C', 'E', 'B', 'D', 'F', 'M', 'G', 'L', 'J', 'Z', 'N', 'Q',
  'R', 'W', '1', '2', '3', '4', '5', '6', '7', 'S']

const mapState = state => ({
  line: state.stop
})

const mapDispatch = dispatch => ({
  handleChange: value => {
    console.log(value)
    dispatch(setStop(value))
  }
})

const WhatIsYourStop = props => (
  <div>
    <AutoComplete
      floatingLabelText="How about your stop?"
      filter={AutoComplete.fuzzyFilter}
      dataSource={stops}
      maxSearchResults={5}
      name="line"
      value={props.line}
      onNewRequest={props.handleChange}
    />
  </div>
)

const WhatIsYourStopContainer = connect(mapState, mapDispatch)(WhatIsYourStop)

export default WhatIsYourStopContainer