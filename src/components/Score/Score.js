import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Score.css'
import Comments from '../comments/Comments'
import MatchInfo from '../MatchInfo/MatchInfo'

const loadingGif = <img src='https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif'
    alt='loading'
    className='loading-gif' />
const baseURL = 'https://api.opendota.com'
const placeholder = 'https://wallpapercave.com/wp/wDL5J5P.jpg'

//TODO: need to style loadingGif to be in center of screen. 

function Score(props) {

    const [match, setMatch] = useState({})
    const [heros, setHero] = useState([])
    const [items, setItems] = useState({})
    // const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`https://api.opendota.com/api/matches/${props.match.params.matchId}`)
            .then(res => {
                setMatch(res.data)
                axios
                    .get('https://api.opendota.com/api/heroStats')
                    .then(res => {
                        setHero(res.data)
                    })
                axios
                    .get('https://api.opendota.com/api/constants/items')
                    .then(res => {
                        setItems(res.data)
                        setLoading(false)
                    })
            })
    }, [])

    // useEffect(() => {
    //     if (match.players) {
    //         const allPlayers = match.players.map(player => {
    //             return player.account_id
    //         })
    //         setPlayers(allPlayers)
    //     }
    // }, [match.players])

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

    function displayRadiant() {
        if (match.players) {
            const matchInfo = match.players.map(player => {

                function getHeroPicture() {
                    if (match.players) {
                        for (let i = 0; i < heros.length; i++) {
                            if (heros[i].id === player.hero_id) {
                                return `${baseURL}${heros[i].img}`
                            }
                        }
                    }
                }


                function getItemPicture(){
                    if(match.players){
                        for(let key in items){
                            // console.log('item...?', key)
                        }
                    }
                }

                // console.log(getItemPicture())

                if (player.player_slot <= 6) {
                    return <div className='score-match-container'>
                        <img className='score-player-hero-pic'
                            alt='NA'
                            src={getHeroPicture()} />
                        <div className='player-text-info'>
                            <p>{player.name}</p>
                            <div>
                                KDA
                                <p>{player.kills}/{player.deaths}/{player.assists}</p>
                            </div>
                            <div>
                                G / X
                                <p>{player.gold_per_min} / {player.xp_per_min}</p>
                            </div>
                            <div>
                                DMG
                                {player.hero_damage}
                            </div>
                        </div>
                        <div className='dota-items'>
                            ITEMS GO HERE
                        </div>
                    </div>
                }
            })
            return matchInfo
        }
    }

    function displayDire() {
        if (match.players) {
            const matchInfo = match.players.map(player => {

                function getHeroPicture() {
                    if (match.players) {
                        for (let i = 0; i < heros.length; i++) {
                            if (heros[i].id === player.hero_id) {
                                return `${baseURL}${heros[i].img}`
                            }
                        }
                    }
                }

                if (player.player_slot >= 125) {
                    return <div className='score-match-container'>
                        <img className='score-player-hero-pic'
                            alt='NA'
                            src={getHeroPicture()} />
                        <p>{player.name}</p>
                    </div>
                }
            })
            return matchInfo
        }
    }

    return (
        <div className='main-score-div'>
            <div className='victory-container'>
                <p>match ID: {match.match_id}</p>
                {handleWhatTeamWon()}
                <div className='score-scores'>
                    <h1 className='rad-score'>{match.radiant_score} </h1>
                                -
                    <h1 className='dire-score'> {match.dire_score}</h1>
                </div>
                <p>{time(match.duration)}</p>
            </div>
            <br></br>
            <div>
                <h1 className='radiant-h1'>RADIANT</h1>
                <br></br>
                <div className='match-score-info-container'>
                    <p className='hero-kda-info'>hero player KDA GPM/XPM  DMG Items</p>
                    <div className='players-container'>
                        {displayRadiant()}
                    </div>
                </div>
                <br></br>
                <h1 className='radiant-h2'>DIRE</h1>
                <div className='match-score-info-container'>
                    <br></br>
                    <p className='hero-kda-info'>hero player KDA GPM/XPM  DMG Items</p>
                    <div className='players-container'>
                        {displayDire()}
                    </div>
                </div>
            </div>
            {loading === true ? null : <Comments props={props} />}
            {/* {loading === true ? null : <MatchInfo />} */}
        </div>
    )
}

export default Score