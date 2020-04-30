import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import './Landing.css'

function Landing(props) {
    const [pros, setPros] = useState([])

    useEffect(() => {
        axios.get('/dota-pros/pros').then(res => {
            setPros(res.data)
        }).catch(err => console.log(err))
    }, [])

    //TODO: need to wrap inside a link that when isLoggedIn on redux is true it will take them to recent matches.
    const proPlayers = pros.map(pro => {
        return <div className='pro-container'>
            <img className='pro-picture'
                alt='pro'
                src={pro.picture} />
            <div>
                <h3>{pro.name}</h3>
                <br/>
                <p>Career winnings: ${pro.winnings}</p>
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