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
            const body ={
                content: content
            }
            axios
                .put(`/dota-pros/posts/${post.dota_posts_id}`, body)
                .then(res => setPosts(res.data))
        }

        return (
            <div className='post-container'>
                <img className='comments-prof-pic' 
                    alt='profile pic'
                    src={props.profile_pic} />
                <div>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>{post.created_at}</p>
                </div>
                {editing ? <div>
                <textarea className="comments-textarea" 
                    onChange={(e) => setContent(e.target.value)}>{post.content}</textarea>
                    <button onClick={() => {
                            setEditing(!editing)
                            handleEditPost()}}>Submit Edit</button>
                </div> : <div className='pencil-holder'>
                        <img className='pencil'
                            onClick={() => setEditing(!editing)}
                            alt='edit'
                            src={pencil} />
                        <button onClick={() => handleDeletePost()}>Delete</button>
                    </div>}
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