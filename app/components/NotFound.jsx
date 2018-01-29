import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = props => {
  const {pathname} = props.location || {pathname: '<< no path >>'}
  console.error('NotFound: %s not found (%o)', pathname, props)
  return (
    <div>
      <h1>Sorry, I couldn't find <pre>{pathname}</pre></h1>
      <p>The router gave me these props:</p>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
      <p>Lost? <NavLink to="/">Here's a way home.</NavLink></p>
      <cite>~ xoxo, bones.</cite>
    </div>
  )
}

export default NotFound
