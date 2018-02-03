import React from 'react'
import firebase from '../../fire'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'
import ActionHome from 'material-ui/svg-icons/action/home'
const auth = firebase.auth()

class NavBarContainer extends React.Component {
    render() {
    return (
        <div className="navBar">
            {/* <img src={} /> TODO MAKE LOGO */}
            <div className="icon-right">
            <IconButton
            containerElement={<Link to="/" />}
            ><ActionHome /></IconButton>
            <IconMenu
                iconButtonElement={<IconButton><ActionAccountCircle /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem 
                primaryText="Log In"
                containerElement={<Link to="/login" />} />
                <MenuItem primaryText="Sign Up"
                containerElement={<Link to="/signup" />} />
                <MenuItem primaryText="Log Out"
                onClick={() => auth.signOut()} />
            </IconMenu>
            </div>
        </div>
    )
    }
}

const NavBar = NavBarContainer

export default NavBar