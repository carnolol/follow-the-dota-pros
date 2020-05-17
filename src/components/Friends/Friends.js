import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Friends.css'


const noImg = 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png'

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
            .get(`/user/me/friends${props.dota_users_id}`)
            .then(res => {
                setFriends(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const reset = () => {
        setName('')
        setPicture('')
        setId('')
    }

    const handleAddFriend = () => {
        const body = {
            name: name,
            picture: picture,
            id: id
        }
        axios
            .post('/user/friends', body)

    }

    const deleteFriend = () => {

    }


    //          !!!!!!!!    MAP HERE    !!!!!!!!

    const myFriends = friends.map(friend => {
        return (
            <div>
                <img className='friend-picture'
                    src={friend.picture ? friend.picture : noImg}
                    alt='no-picture' />
                <h3>{friend.name}</h3>
                <p>{friend.steam_account_id}</p>
            </div>
        )
    })
    console.log(typeof (id))
    return (
        <div className='Friends-div'>

            {addingFriend ? (
                <div className='addFriend-form'>
                    <div>
                        <button onClick={() => setAddingFriend(!addingFriend)}>X</button>
                        <p>Name:</p>
                        <input onChange={(e) => setName(e.target.value)} />
                        <p>Picture</p>
                        <input onChange={(e) => setPicture(e.target.value)} />
                        <p>Steam Account ID</p>
                        <input type='number'
                            onChange={(e) => setId(+e.target.value)} />
                    </div>
                    <div>
                        <button onClick={() => handleAddFriend()}>Add!</button>
                        <button onClick={() => reset()}>Reset</button>
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

export default Friends