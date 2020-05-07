import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './RecentMatches.css'

const baseURL = 'https://api.opendota.com'
const loadingGif = <img src='https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif'
alt='loading'/>

//* player slot for radiant players = 0,1,2,3,4
//* player_slot for dire players = 128,129,130,131,132

//TODO: make it so user can click a more button to change the amount of matches displayed based of the query. 

function RecentMatches(props) {
    const [matches, setMatch] = useState([])
    const [heros, setHeros] = useState([])
    const [pros, setPros] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`https://api.opendota.com/api/players/${props.match.params.proPlayerId}/matches?limit=10`)
            .then(res => {
                setMatch(res.data)
                axios
                    .get('https://api.opendota.com/api/heroStats').then(res => {
                        setHeros(res.data)

                        axios.get(`/user/me/pros/${props.dota_users_id}`).then(res => setPros(res.data))
                        setLoading(false)
                    })
            })
    }, [])


    function getPlayerName() {
        for (let i = 0; i < pros.length; i++) {
            // console.log('inside loop steam ID:', pros[i].steam_account_id)
            // console.log('NAME:', pros[i].name)
            // console.log('params?:', props.match.params.proPlayerId)
            //? == because the url is considered a string. 
            if (pros[i].steam_account_id == props.match.params.proPlayerId) {
                return pros[i].name
            }
        }
    }
    // console.log(getPlayerName())
    const recentMatches = matches.map(match => {

        function determineWhoWon() {
            if (match.player_slot >= 4 && match.radiant_win === true) {
                return <h4 className='victory'>Victory!</h4>
            } if (match.player_slot >= 4 && match.radiant_win === false) {
                return <h4 className='defeat' >Defeat!</h4>
            } if (match.player_slot <= 128 && match.radiant_win === true) {
                return <h4 className='defeat' >Defeat!</h4>
            } else {
                return <h4 className='victory'>Victory!</h4>
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
            <Link to={`/${props.match.params.proPlayerId}/${match.match_id}/score`} style={{textDecoration: 'none'}} >
                <div className='match-container'>
                    <img className='hero-picture'
                        alt='hero'
                        src={matchUpId()} />
                    {determineWhoWon()}
                    <div className='duration-container'>
                        <p className='match-info'>Duration:</p>
                        <p>{time(match.duration)}</p>
                    </div>
                    <div className='kda-container'>
                        <p className='match-info'>KDA</p>
                        <p>{match.kills} / {match.deaths} / {match.assists}</p>
                    </div>
                </div>
            </Link>
        )
    })
    return (
        <div className='main-recent-matches-div'>
            <h2>{getPlayerName()}'s match history!</h2>
            {loading ? loadingGif : recentMatches}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(RecentMatches)