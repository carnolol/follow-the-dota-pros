import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './Comments.css'

function Comments(props) {
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        axios
            .get(`/dota-pros/posts/${props.match.params.matchId}`)
            .then(res => {
                setPosts(res.data)
            })
    }, [])

    function handleAddPost() {
        const body = {
            author_id: props.dota_users_id,
            title: title,
            content: content,
            match_id: props.match.params.matchId
        }
        axios
            .post('/dota-pros/posts', body)
            .then(res => setPosts(res.data))
    }

    const matchPosts = posts.map(post => {
        return (
            <div className='post-container'>
                <h1>{post.title}</h1>
                <h1>{post.content}</h1>
                <h1>{post.created_at}</h1>
            </div>
        )
    })
    // console.log(typeof (props.match.params.matchId))
    // console.log(props.match.params.matchId)
    console.log('pic?', props.profile_pic)
    return (

        <div className='main-comments-div'>
            <h1>Comment below!</h1>
            <div>
                <input onChange={(e) => setTitle(e.target.value)}
                    placeholder='Title'/>
                <input onChange={(e) => setContent(e.target.value)}
                    placeholder='content'/>
                <button onClick={() => handleAddPost()}>ADD POST</button>
            </div>
            {matchPosts}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

const com = connect(mapStateToProps, null)(Comments)
export default withRouter(com)