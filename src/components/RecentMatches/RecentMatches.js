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
    const [pros, setPros] = useState([])

    useEffect(() => {
        axios
            .get(`https://api.opendota.com/api/players/${props.match.params.proPlayerId}/matches?limit=10`)
            .then(res => {
                setMatch(res.data)
                axios
                    .get('https://api.opendota.com/api/heroStats').then(res => {
                        setHeros(res.data)

                        axios.get(`/user/me/pros/${props.dota_users_id}`).then(res => setPros(res.data))

                    })
            })
    }, [])


    function getPlayerName() {
        for (let i = 0; i < pros.length; i++) {
            console.log('inside loop steam ID:', pros[i].steam_account_id)
            console.log('NAME:', pros[i].name)
            console.log('params?:', props.match.params.proPlayerId)
            //* == because the url is considered a string. 
            if (pros[i].steam_account_id == props.match.params.proPlayerId) {
                return pros[i].name
            }
        }
    }
    console.log(getPlayerName())
    const recentMatches = matches.map(match => {

        function matchUpId() {
            for (let i = 0; i < heros.length; i++) {
                if (heros[i].id === match.hero_id) {
                    return `${baseURL}${heros[i].img}`
                }
            }
        }
        function time(num) {
            const minutes = Math.floor(num / 60)
            const seconds = num % 60
            return `${minutes}:${seconds}`
        }

        // function getPlayerName(){
        //     for(let i = 0; i < pros.length; i++){
        //         if(pros[i].steam_account_id === props.match.params.proPlayerId){
        //             return pros[i].name
        //         }
        //     }
        // }
        // console.log(getPlayerName())
        return (
            <Link to={`/${props.match.params.proPlayerId}/${match.match_id}/score`}>
                <div className='match-container'>
                    <img className='hero-picture'
                        alt='hero picture'
                        src={matchUpId()} />
                    <p className='match-info'>Duration: {time(match.duration)}</p>
                    <p className='match-info'>Kills: {match.kills}</p>
                    <p className='match-info'>Deaths: {match.deaths}</p>
                    <p className='match-info'>Assists: {match.assists}</p>
                </div>
            </Link>
        )
    })
    return (
        <div className='main-recent-matches-div'>
            <h2>{getPlayerName()}'s match history!</h2>
            {recentMatches}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(RecentMatches)