import React, { useState, useEffect } from 'react'
import './Userinfo.css'
import { connect } from 'react-redux'
import axios from 'axios'
import ProPlayerPool from '../ProPlayerPool/ProPlayerPool'
// import { Link } from 'react-router-dom'

function UserInfo(props) {
    const [user, setUser] = useState({})
    const [bio, setBio] = useState('WOWOWOWOWOWO')
    const [age, setAge] = useState('56')

    useEffect(() => {
        axios
            .get('/user/me')
            .then(res => {
                console.log(res.data)
                setUser(res.data)
            })
            .catch(err => alert(`Error in UserInfo w/ .get /user/me ${err}`))
    }, [user])
    const handleEditUser = () =>{
        const body = {
            bio: bio,
            age: age
        }
        axios
            .put(`/user/me/${props.dota_user_id}`, body).then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }

    console.log('userinfo user:', user)
    return (
        <div className='info-main-div'>
            <h2>Welcome back {props.username}</h2>
            <p>double click to edit profile</p>
            <p>Age: {user.age}</p>
            <p>About me: {user.bio}</p>
            <button onClick={() => handleEditUser()}>Edit Profile</button>
            <br></br>
            <ProPlayerPool/>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(UserInfo)