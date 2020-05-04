import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './RecentMatches.css'

const baseURL = 'https://api.opendota.com'
const victory = 'https://i.ytimg.com/vi/d_q4p19ojKs/maxresdefault.jpg'
const loss = 'https://pngimage.net/wp-content/uploads/2018/06/overwatch-defeat-png-5.png'

//* player slot for radiant players = 0,1,2,3,4
//* player_slot for dire players = 128,129,130,131,132

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

        function determineWhoWon(){
            if(match.player_slot >= 4 && match.
                radiant_win == true){
                    return <h3>Victory!</h3>
                } if (match.player_slot >= 4 && match.radiant_win == false){
                    return <h3>Defeat!</h3>
                } if (match.player_slot <= 128 && match.radiant_win == true){
                    return <h3>Defeat!</h3>
                } else {
                    return <h3>Victory!</h3>
                }
        }

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

        return (
            <Link to={`/${props.match.params.proPlayerId}/${match.match_id}/score`}>
                <div className='match-container'>
                    <img className='hero-picture'
                        alt='hero picture'
                        src={matchUpId()} />
                        {determineWhoWon()}
                    {/* <img src={determineWhoWon()} /> */}
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