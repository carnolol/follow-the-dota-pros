import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Header.css'
import { connect } from 'react-redux'
import { makeUser, logoutUser } from '../../ducks/userReducer'
import { Link } from 'react-router-dom'

const logo = 'https://pbs.twimg.com/profile_images/1148484652358746112/UdJALHjZ_400x400.png'
const hamburger = 'https://www.stickpng.com/assets/images/588a6507d06f6719692a2d15.png'

function Header(props) {

    const [menu, setMenu] = useState(false)

    useEffect((props) => {
        axios
            .get('/user/me')
            .then(res => {
                props.makeUser(res.data)
            }).catch(err => console.log(err))
    }, [props.isLoggedIn])

    const handleLogout = () => {
        axios
            .delete('/user/logout')
            .then(() => props.logoutUser())

    }


    return (
        <div className='header-main'>
            <Link to='/'>
                <img className='header-logo'
                    alt='dota-logo'
                    src={logo} />
            </Link>

            <h1 className='header-h1'>Dota Pros</h1>

            {props.isLoggedIn === true ? (
                <div className='login-info'>
                    <p className='header-username'>{props.username}</p>
                    <Link to='/myProfile'>
                        <img className='profile-header-pic'
                            alt='prof'
                            onClick={() => setMenu(!menu)}
                            src={props.profile_pic} />
                    </Link>
                    <button className='logout-button'
                        onClick={() => handleLogout()}>Logout</button>
                </div>
            ) : (
                    <Link to='/login'>
                        <button className='header-button'>Sign in!</button>
                    </Link>
                )}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { makeUser, logoutUser })(Header)


