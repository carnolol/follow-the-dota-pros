import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <div className='main-footer-div'>
            <div className='child-footer-div'>
                <a href='https://www.linkedin.com/in/michael-chadwick91/'>
                    <img className='linkin-logo'
                        alt='linkedin logo'
                        src='https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg' />
                </a>
                <a href='https://github.com/carnolol'>
                    <img className='github-logo'
                        alt='github logo'
                        src='https://cdn.iconscout.com/icon/free/png-512/github-153-675523.png'/>
                </a>
            </div>
        </div>
    )
}

export default Footer