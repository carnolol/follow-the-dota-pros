import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import './Landing.css'

function Landing(props) {
    const[]

    const getProPlayers = () => {
        axios.get('/dota-pros/pros')
    }
    return (
        <div className='main-landing-div'>
                <h1>landing JS</h1>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(Landing)