import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './RecentMatches.css'

const baseURL = 'https://api.opendota.com'
const sniper = 'https://api.opendota.com/apps/dota2/images/heroes/sniper_full.png?'

function RecentMatches(props) {
    const [matches, setMatch] = useState([])
    const [heros, setHeros] = useState([])
    useEffect(() => {
        axios
            .get(`https://api.opendota.com/api/players/${props.match.params.proPlayerId}/matches?limit=5`)
            .then(res => {
                setMatch(res.data)
                axios.get('https://api.opendota.com/api/heroStats').then(res => {
                    setHeros(res.data)
                })
            })
    }, [])

    const recentMatches = matches.map(match => {

        function matchUpId() {
            for (let i = 0; i < heros.length; i++) {
                if (heros[i].id === match.hero_id) {
                    console.log('IMG!?', `${baseURL}${heros[i].img}`)
                    return `${baseURL}${heros[i].img}`
                    // return <img src={`${baseURL}${heros[i].img}`}/>
                }
            }
        }
        function time(num) {
            const minutes = Math.floor(num / 60)
            const seconds = num % 60
            return `${minutes}:${seconds}`
        }
        console.log(matchUpId())
        return (
            <Link to={`/${props.match.params.proPlayerId}/${match.match_id}/score`}>
                <div className='match-container'>
                    <img alt='hero picture' 
                        src={matchUpId()}/>
                    <p>Duration: {time(match.duration)}</p>
                    <p>Kills: {match.kills}</p>
                    <p>Deaths: {match.deaths}</p>
                    <p>Assists: {match.assists}</p>
                    <p>{() => matchUpId()}</p>
                </div>
            </Link>
        )
    })
    return (
        <div className='main-recent-matches-div'>
            {/* {JSON.stringify(matches)} */}
            {recentMatches}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(RecentMatches)