import React, { useState, useEffect } from 'react'
import './Userinfo.css'
import { connect } from 'react-redux'
import axios from 'axios'
import ProPlayerPool from '../ProPlayerPool/ProPlayerPool'
// import { Link } from 'react-router-dom'

const pencil = 'https://cdn1.iconfinder.com/data/icons/editing/60/cell-2-0-480.png'

//TODO: edit function does edit the DB but doesn't display on the front end

function UserInfo(props) {
    const [user, setUser] = useState({})
    const [bio, setBio] = useState('')
    const [editBio, setEditBio] = useState(false)


    useEffect(() => {
        axios
            .get('/user/me')
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    }, [user.bio])

    const handleEditUser = () => {
        axios
            .put(`/user/me/${props.dota_users_id}`, { bio: bio })
            .then(res => {
                console.log('inside Edit User res.data:', res.data)
                setUser(res.data)
                setEditBio(!editBio)
            })
            .catch(err => console.log(err))
    }
    console.log('USER BIO:', user.bio)

    //         < div >
    //         <textarea onChange={(e) => setBio(e.target.value)}>{user.bio}</textarea>
    //         <button onClick={() => handleEditUser()}>Submit</button>
    //         <button onClick={() => setEditBio(!editBio)}>Reset</button>
    // </ >

    return (
        <div className='info-main-div'>
            <h2 className='welcome-back'>Welcome back {user.username}</h2>
            <div className='bio-container'>
                {editBio ? (
                    <div>
                        <textarea className='user-textarea'
                            maxLength='150'
                            onChange={(e) => setBio(e.target.value)}>{user.bio}</textarea>
                        <button onClick={() => handleEditUser()}>Submit</button>
                        <button onClick={() => setEditBio(!editBio)}>Reset</button>
                    </div>
                ) : (
                        <div className='bio-and-pencil'>
                            <p>About me:</p>
                            <br></br>
                            <div className='pic-and-bio'>
                                <img className='user-info-pic'
                                    alt='pic'
                                    src={user.profile_pic} />
                                <p className='user-bio'>{user.bio}</p>
                            </div>
                            <img className='pencil'
                                alt='pencil'
                                src={pencil}
                                onClick={() => setEditBio(!editBio)} />
                        </div>)}
            </div>
            <br></br>
            <ProPlayerPool />
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(UserInfo)