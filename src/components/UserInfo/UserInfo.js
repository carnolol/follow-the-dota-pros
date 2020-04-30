import React, { useState, useEffect } from 'react'
import './Userinfo.css'
import { connect } from 'react-redux'
import axios from 'axios'
// import { Link } from 'react-router-dom'

function UserInfo(props) {
    const [user, setUser] = useState({})
    const [input, setInput] = useState('')

    useEffect(() => {
        axios
            .get('/user/me')
            .then(res => setUser(res.data))
            .catch(err => alert(`Error in UserInfo w/ .get /user/me ${err}`))
    }, [])
    const handleEditUser = () =>{
        axios
            .get(`/user/me/${props.dota_user_id}`)
            .then()
            .catch(err => console.log(err))
    }

    console.log('userinfo user:', user)
    return (
        <div className='info-main-div'>
            <h2>Welcome back {props.username}</h2>
            <p>double click to edit profile</p>
            <p>Age: {props.age}</p>
            <p>About me: {props.bio}</p>
            <button>Edit Profile</button>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(UserInfo)