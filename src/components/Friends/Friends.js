import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Friends.css'


const noImg = 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png'
const trash = 'https://cdn.iconscout.com/icon/premium/png-512-thumb/delete-1432400-1211078.png'



// TODO: need to write out Delete Friend endpoint in backend. 

function Friends(props) {
    const [friends, setFriends] = useState([])
    const [name, setName] = useState('')
    const [picture, setPicture] = useState('')
    const [id, setId] = useState('')
    const [addingFriend, setAddingFriend] = useState(false)
    //* be sure to parse id when it comes in because its an int in the DB id refs steam_account_id

    useEffect(() => {
        axios
            .get(`/user/me/friends/${props.dota_users_id}`)
            .then(res => {
                setFriends(res.data)
            })
            .catch(err => console.log(err))
    }, [friends.length - 1])

    const reset = () => {
        setName('')
        setPicture('')
        setId('')
    }

    const handleAddFriend = () => {
        const body = {
            name: name,
            picture: picture,
            steam_account_id: id
        }
        axios
            .post('/user/friends', body)
            .then(res => {
                setFriends(res.data)
            })
    }



    //          !!!!!!!!    MAP HERE    !!!!!!!!

    const myFriends = friends.map(friend => {

        const deleteFriend = () => {
            axios
                .delete(`/user/me/friends/${friend.id}`)
                .then(res => {
                    setFriends(res.data)
                })
        }

        return (
            <div className='main-pro-div'>
                <Link to={`/recent-matches/${friend.steam_account_id}`}>
                    <img className='proplayer-pic'
                        src={friend.picture ? friend.picture : noImg}
                        alt='no-picture' />
                </Link>
                <h3 className='pro-name'>{friend.name}</h3>
                <br></br>
                <p>Steam ID:</p>
                <br></br>
                <p>{friend.steam_account_id}</p>
                <br></br>
                <img className='delete-pro'
                    alt='trashcan'
                    src={trash}
                    onClick={() => deleteFriend()}
                />
            </div>
        )
    })


    console.log(typeof (id))
    return (
        <div className='Friends-div'>

            {addingFriend ? (
                <div className='addFriend-form'>
                    <img className='form-img'
                        src={picture ? picture : noImg}
                        alt='na' />
                    <div className='addfriend-inputs'>
                        <button onClick={() => setAddingFriend(!addingFriend)}>X</button>
                        <p>Name:</p>
                        <input onChange={(e) => setName(e.target.value)} />
                        <p>Picture</p>
                        <input onChange={(e) => setPicture(e.target.value)} />
                        <p>Steam Account ID</p>
                        <input type='number'
                            onChange={(e) => setId(+e.target.value)} />
                        <div>
                            <button onClick={() => handleAddFriend()}>Add!</button>
                            <button onClick={() => reset()}>Reset</button>
                        </div>
                    </div>
                </div>
            ) : (
                    <button onClick={() => setAddingFriend(!addingFriend)}>Add Friend to follow!</button>
                )}

            <h1>My Friends</h1>
            {myFriends}
        </div>
    )
}

const mapStateToPros = reduxState => reduxState

export default connect(mapStateToPros)(Friends)