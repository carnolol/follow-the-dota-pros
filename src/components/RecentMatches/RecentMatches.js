import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './RecentMatches.css'

function RecentMatches(props) {
    const [matches, setMatch] = useState([])
    useEffect(() => {
        axios
            .get(`https://api.opendota.com/api/players/${props.match.params.proPlayerId}/matches?limit=5`)
            .then(res => {
                setMatch(res.data)
            })
    }, [])
    console.log(props)
    const recentMatches = matches.map(match => {
        return (
            <Link to={`/${props.match.params.proPlayerId}/${match.match_id}/score`}>
                <div>
                    <h1>{match.match_id}</h1>
                </div>
            </Link>
        )
    })
    return (
        <div className='main-recent-matches-div'>
            {JSON.stringify(matches)}
            {recentMatches}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(RecentMatches)