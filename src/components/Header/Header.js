import React from 'react'
import './Header.css'
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
            <Link to='/myProfile'>
                <p className='header-username'>Test:{props.username}</p>
                <img className='profile-header-pic'
                    alt='prof'
                    src={props.profile_pic} />
            </Link>
        </div>
    )
}

export default Header