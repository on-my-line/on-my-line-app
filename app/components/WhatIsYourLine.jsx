import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import {connect} from 'react-redux'
import {setLine} from '../store'

const stops = ['A', 'C', 'E', 'B', 'D', 'F', 'M', 'G', 'L', 'J', 'Z', 'N', 'Q',
  'R', 'W', '1', '2', '3', '4', '5', '6', '7', 'S']

const mapState = state => ({
  line: state.line
})

const mapDispatch = dispatch => ({
  handleChange: value => {
    console.log(value)
    dispatch(setLine(value))
  }
})

const WhatIsYourLine = (props) => (
  <div>
    <AutoComplete
      floatingLabelText="What is your line?"
      filter={AutoComplete.fuzzyFilter}
      dataSource={stops}
      maxSearchResults={5}
      name="line"
      value={props.line}
      onNewRequest={props.handleChange}
    />
  </div>
)

const WhatIsYourLineContainer = connect(mapState, mapDispatch)(WhatIsYourLine)

export default WhatIsYourLineContainer
