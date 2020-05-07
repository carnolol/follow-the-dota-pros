import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { makeUser } from '../../ducks/userReducer'
import './Auth.css'

const logo = 'https://pbs.twimg.com/profile_images/1148484652358746112/UdJALHjZ_400x400.png'

function Auth(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleRegisterUser = () => {
        const body = {
            author_id: props.dota_users_id,
            username: username,
            password: password,
            email: email,
            profile_pic: props.profile_pic
        }
        axios.post('/user/register', body).then(res => {
            console.log('redux data:', res.data)
            props.makeUser(res.data)
            props.history.push('/')
        }).catch(err => alert(`That Username is Taken! ${err}`))
    }

    const handleLoginUser = () => {
        const body = {
            username: username,
            password: password
        }
        axios.post('/user/login', body).then(res => {
            props.makeUser(res.data)
            props.history.push('/')
        }).catch(err => alert(`Username or Password is incorrect! ${err}`))
    }

    return (
        <div className='main-auth-div'>
            <div className='child-auth-div'>
                <img className='auth-logo'
                    alt='logo'
                    src={logo} />
                <p className='auth-text'>{`Email: (optional)`}</p>
                <input className='auth-input'
                    placeholder='email'
                    onChange={(e) => setEmail(e.target.value)} />
                <p className='auth-text'>Username:</p>
                <input className='auth-input'
                    placeholder='username'
                    onChange={e => setUsername(e.target.value)} />
                <p className='auth-text'>Password:</p>
                <input className='auth-input'
                    placeholder='Max length of 16'
                    onChange={e => setPassword(e.target.value)}
                    type='password' required
                    maxLength='16' />
                <div>
                    <button className='auth-buttons'
                        onClick={() => handleLoginUser()}>Login</button>
                    <button className='auth-buttons'
                        onClick={() => handleRegisterUser()}>Register</button>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { makeUser })(Auth)