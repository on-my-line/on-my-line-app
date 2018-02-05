import React from 'react'
import {connect} from 'react-redux'

const mapState = state => ({
    userLine: state.userLine
})

const UserLine = (props) => {
    if(!props.userLine) return <div />

        return(
            <div className="fade">
                <h1> Continue on the </h1>
                <div className='line-circle'>
                    <div className='line-circle-text'>{props.userLine}</div>
                </div>
            </div>
        )
}

const UserLineContainer = connect(mapState)(UserLine)

export default UserLineContainer