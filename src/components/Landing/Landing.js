import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import './Landing.css'

function Landing(props) {
    const [pros, setPros] = useState([])

    useEffect(() => {
        axios.get('/dota-pros/pros').then(res => {
            console.log('I AM THE DATA:', res.data)
            setPros(res.data)
        }).catch(err => console.log(err))
    }, [])
    const proPlayers = pros.map(pro => {
        return <div className='pro-container'>
            <img className='pro-picture'
                alt='pro'
                src={pro.picture} />
            <div>
                <h3>{pro.name}</h3>
                <br/>
                <p>Has won ${pro.winnings} in his career!</p>
            </div>
        </div>
    })
    return (
        <div className='main-landing-div'>
            {proPlayers}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(Landing)