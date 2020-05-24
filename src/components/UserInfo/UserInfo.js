import React, { useState, useEffect } from 'react'
import './Userinfo.css'
import { connect } from 'react-redux'
import axios from 'axios'
import Friends from '../Friends/Friends'
import ProPlayerPool from '../ProPlayerPool/ProPlayerPool'
// import { Link } from 'react-router-dom'

const pencil = 'https://cdn1.iconfinder.com/data/icons/editing/60/cell-2-0-480.png'

const loadingGif = <div>
    <h1>One moment please...</h1>
    <img className='loading'
        src='https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif'
        alt='loading' />
</div>



function UserInfo(props) {

    const [user, setUser] = useState({})
    const [bio, setBio] = useState('')
    const [editBio, setEditBio] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        window.scrollTo(0, 0)
        axios
            .get('/user/me')
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))

      setLoading(false)
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
            <div className='steam-id-box'>
                <p>To add a friend to follow, you will need their steam ID. This can be tricky to find... But we are here to help! Click on the link bellow, enter the account name of the player your want to follow. Then simply copy the number in the steamID3 box. It will look something like this...</p>
                <br></br>
                <p>{`[U:1:Copy this Number]`}</p>
                <br></br>
                <a href='https://steamidfinder.com/'>Click here to get your steam ID!</a>
                <br></br>
            </div>
            <Friends />
            <br></br>
            <ProPlayerPool />
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(UserInfo)