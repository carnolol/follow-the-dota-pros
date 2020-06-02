import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Header.css'
import { connect } from 'react-redux'
import { makeUser, logoutUser } from '../../ducks/userReducer'
import { Link, withRouter } from 'react-router-dom'
import logout from '../icons/icons8-shutdown-52.png'
import home from '../icons/icons8-home-50.png'
import profile from '../icons/icons8-name-50.png'
import signin from '../icons/icons8-signin-50.png'

const logo = 'https://pbs.twimg.com/profile_images/1148484652358746112/UdJALHjZ_400x400.png'
const hamburger = 'https://i.ya-webdesign.com/images/hamburger-menu-icon-png-white-6.png'

function Header(props) {
    const php = props.history.push

    const [menu, setMenu] = useState(false)

    useEffect(() => {
        console.log('header effect')
        axios
            .get('/user/me')
            .then(res => {
                props.makeUser(res.data)
            }).catch(err => console.log(err))
    }, [])

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
                    src={logo} 
                    onClick={() => setMenu(false)}/>
            </Link>

            <h1 className='header-h1'>Dota Pros</h1>

            {props.isLoggedIn ? (
                <div className='login-info'>
                    {/* <p className='header-username'>{props.username}</p> */}
                    <img className='profile-header-pic'
                        alt='prof'
                        onClick={() => {
                            php('/myProfile')
                            setMenu(!menu)
                        }}
                        src={props.profile_pic} />
                    <img className='hamburger'
                        src={hamburger}
                        alt='need new burger menu'
                        onClick={() => {
                            setMenu(!menu)
                        }} />
                    {/* `mobile-nav-list ${open ? `mobile-nav-list-open` : null}` */}
                    {/* <nav className={menu ? 'mobile-nav-open' : 'mobile-nav-closed'}> */}
                    <ul className={menu ? 'mobile-nav-open' : 'mobile-nav-closed'}>
                        <div className='nav-item-container'>
                            <img className='nav-item-pic'
                                src={home}
                                alt='home logo' />
                            <li className='nav-item'
                                onClick={() => {
                                    php('/')
                                    setMenu(!menu)
                                }}>
                                Home
                                </li>
                        </div>
                        <div className='nav-item-container'>
                            <img className='nav-item-pic'
                                src={profile}
                                alt='home logo' />
                            <li className='nav-item'
                                onClick={() => {
                                    php('/myProfile')
                                    setMenu(!menu)
                                }}>
                                Profile
                                </li>
                        </div>
                        <div className='nav-item-container'>
                            <img className='nav-item-pic'
                                src={logout}
                                alt='home logo' />
                            <li className='nav-item'
                                onClick={() => {
                                    php('/login')
                                    setMenu(!menu)
                                    handleLogout()
                                }}>
                                Logout
                                </li>
                        </div>
                    </ul>
                    {/* </nav> */}
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

export default connect(mapStateToProps, { makeUser, logoutUser })(withRouter(Header))


