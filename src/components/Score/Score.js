import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Score.css'
import Comments from '../comments/Comments'
import MatchInfo from '../MatchInfo/MatchInfo'

const loadingGif = <img src='https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif'
    alt='loading' />

function Score(props) {

    const [match, setMatch] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`https://api.opendota.com/api/matches/${props.match.params.matchId}`)
            .then(res => {
                setMatch(res.data)
                setLoading(false)
            })
    }, [])

    function handleWhatTeamWon() {
        if (match.radiant_win === false) {
            return <h1>DIRE VICTORY!</h1>
        } else {
            return <h1> RADIANT VICTORY!</h1>
        }
    }

    function time(num) {
        const minutes = Math.floor(num / 60)
        const seconds = num % 60
        return `${minutes}:${seconds}`
    }


    return (
        <div className='main-score-div'>
            <p>match ID: {match.match_id}</p>
            {handleWhatTeamWon()}
            <div className='score-scores'>
                <h1>{match.radiant_score} </h1>
                    -
                <h1> {match.dire_score}</h1>
            </div>
            <p>{time(match.duration)}</p>
            <MatchInfo />
            <Comments />
        </div>
    )
}

export default Score