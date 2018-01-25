import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

const stops = ['A', 'C', 'E', 'B', 'D', 'F', 'M', 'G', 'L', 'J', 'Z', 'N', 'Q',
  'R', 'W', '1', '2', '3', '4', '5', '6', '7', 'S']

/**
 * Two examples of filtering. The first uses `caseInsensitiveFilter`, the second uses `fuzzyFilter`,
 * and limits the number of results displayed using the `maxSearchResults` property.
 */
const WhatIsYourLine = () => (
  <div>
    <AutoComplete
      floatingLabelText="M, L, 2, 3...."
      filter={AutoComplete.fuzzyFilter}
      dataSource={stops}
      maxSearchResults={5}
    />
  </div>
)

export default WhatIsYourLine
