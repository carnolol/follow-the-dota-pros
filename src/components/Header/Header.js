import React from 'react'
import './Header.css'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

const logo = 'https://i.ya-webdesign.com/images/dota-2-logo-png-2.png'

function Header(props) {
    return (
        <div className='header-main'>
            <Link to='/'>
                <img className='header-logo'
                    alt='dota-logo'
                    src={logo} />
            </Link>
            <h1 className='header-h1'>Dota Pros</h1>
            {props.isLoggedIn === true ? <Link to='/myProfile'>
                <p className='header-username'>Welcome:{props.username}</p>
                <img className='profile-header-pic'
                    alt='prof'
                    src={props.profile_pic} />
            </Link> : <Link to='/login'><button className='header-button'>Click to become a member!</button></Link>}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(Header)


