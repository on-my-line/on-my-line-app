import React from 'react'
import firebase from '../../fire'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'
const auth = firebase.auth()

export default class NavBar extends React.Component {
    constructor() {
    super()
        this.state = {}

        // this.toggleMenu = this.toggleMenu.bind(this)
    }

    render() {
    return (
        <div className="navBar">
            {/* <img src={} /> TODO MAKE LOGO */}
            <div className="icon-right">
            <IconMenu
                iconButtonElement={<IconButton><ActionAccountCircle /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Log In" />
                <MenuItem primaryText="Sign Up" />
            </IconMenu>
            </div>
        </div>
    )
    }
}