import React from 'react'
import firebase from '../../fire'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import ActionHome from 'material-ui/svg-icons/action/home'
import MapsNearMe from 'material-ui/svg-icons/maps/near-me'
import Badge from 'material-ui/Badge'
const auth = firebase.auth()
import { getCurrentUser } from '../store'
import { connect } from 'react-redux'
import { getUserEvents, getUserExtras } from '../../fire/refs'

const mapState = state => ({user: state.user})
const mapDispatch = dispatch => ({
    getUser() {
        dispatch(getCurrentUser())
    }
})

class NavBarContainer extends React.Component {
    componentDidMount() {
        this.props.getUser()
    }

    render() {
        return (
            <div className="navBar">
                <IconButton
                containerElement={<Link to="/" />}
                ><ActionHome /></IconButton>
                <IconMenu
                    iconButtonElement={<IconButton><ActionAccountCircle /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                {this.props.user === "none" ? 
                    <div>
                    <MenuItem 
                    primaryText="Log In"
                    containerElement={<Link to="/login" />} />
                    <MenuItem primaryText="Sign Up"
                    containerElement={<Link to="/signup" />} />
                    </div>
                :
                    <div>
                    <MenuItem primaryText="Log Out"
                    onClick={() => auth.signOut()} />
                    </div>
                }
                </IconMenu>
                {this.props.user !== "none" ?
                <Badge
                badgeContent={0}
                secondary={true}
                badgeStyle={{top: 12, right: 12}}
                >
                    <IconButton
                    containerElement={<Link to="/login" />}>
                        <MapsNearMe />
                    </IconButton>
                </Badge>
                :
                null
            }
            </div>
        )
    }
}

const NavBar = connect(mapState, mapDispatch)(NavBarContainer)

export default NavBar