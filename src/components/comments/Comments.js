import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import './Comments.css'

function Comments(props) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios
            .get(`/dota-pros/posts/${props.match.params.matchId}`)
            .then(res => {
                setPosts(res.data)
            })
    }, [])

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
    return (

        <div className='main-comments-div'>
            Comments.JS
            {matchPosts}
        </div>
    )
}

export default withRouter(Comments)