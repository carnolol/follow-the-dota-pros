import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {makeUser} from '../../ducks/userReducer'
import './Auth.css'

function Auth(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const handleRegisterUser = () => {
        const body = {
            author_id: props.userId,
            username: username,
            password: password,
            email: email,
            profile_pic: props.profile_pic
        }
        axios.post('/user/register', body).then(res => {
            console.log('redux data:', res.data)
            props.makeUser(res.data)
        }).catch(err => `error w/ handleRegisterUser ${err}`)
    }
    return (
        <div className='main-auth-div'>
            <input placeholder ='email'
                onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder ='username'
                onChange={e => setUsername(e.target.value)}/>
            <input placeholder ='password'
                onChange={e => setPassword(e.target.value)}/>
                <button>Login</button>
                <button onClick={() => handleRegisterUser()}>Register</button>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {makeUser})(Auth)