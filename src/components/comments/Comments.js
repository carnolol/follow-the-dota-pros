import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './Comments.css'

const pencil = 'https://cdn1.iconfinder.com/data/icons/editing/60/cell-2-0-480.png'

function Comments(props) {
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        axios
            .get(`/dota-pros/posts/${props.match.params.matchId}`)
            .then(res => {
                setPosts(res.data)
            })
    }, [posts.length - 1])

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

    console.log(posts)


    const matchPosts = posts.map(post => {

        console.log(post)

        function handleDeletePost() {
            axios
                .delete(`/dota-pros/posts/${post.dota_posts_id}`)
                .then(res => setPosts(res.data))
        }

        function handleEditPost() {
            
        }

        return (
            <div className='post-container'>
                <img alt='profile pic'
                    src={props.profile_pic} />
                <h1>{post.title}</h1>
                <h1>{post.content}</h1>
                <h1>{post.created_at}</h1>
                <button onClick={() => handleDeletePost()}>Delete</button>
                <img className='pencil'
                    onClick={() => setEditing(!editing)}
                    alt='edit'
                    src={pencil} />
                <textarea>{post.content}</textarea>
                <button onClick={() => handleEditPost()}>Submit Edit</button>
            </div>
        )
    })

    return (

        <div className='main-comments-div'>
            <h1>Comment below!</h1>
            <div>
                <input onChange={(e) => setTitle(e.target.value)}
                    placeholder='Title' />
                <input onChange={(e) => setContent(e.target.value)}
                    placeholder='content' />
                <button onClick={() => handleAddPost()}>ADD POST</button>
            </div>
            {matchPosts}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

const com = connect(mapStateToProps, null)(Comments)
export default withRouter(com)