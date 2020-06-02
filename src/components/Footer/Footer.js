import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <div className='main-footer-div'>
            <h3>Thank you for viewing Dota-Pros!</h3>
            <p>This website was made and designed by:</p>
            <div className='child-footer-div'>
                <p>Mike Chadwick</p>
                <div>
                    <a href='https://www.linkedin.com/in/michael-chadwick91/'>
                        <img className='linkin-logo'
                            alt='linkedin logo'
                            src='https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg' />
                    </a>
                    <a href='https://github.com/carnolol'>
                        <img className='github-logo'
                            alt='github logo'
                            src='https://cdn.iconscout.com/icon/free/png-512/github-153-675523.png' />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer