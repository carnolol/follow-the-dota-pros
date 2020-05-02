import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './RecentMatches.css'

function RecentMatches(props) {
    const [match, setMatch] = useState([])
    useEffect(() => {
        axios.get(`https://api.opendota.com/api/players/{account_id}/matches`)
    }, [])
    return (
        <div className='main-recent-matches-div'>
            Recent Matches.js
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(RecentMatches)