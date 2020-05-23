import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './RecentMatches.css'

const baseURL = 'https://api.opendota.com'
const loadingGif = <img src='https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif'
    alt='loading' />

//* player slot for radiant players = 0,1,2,3,4
//* player_slot for dire players = 128,129,130,131,132


function RecentMatches(props) {
    const [matches, setMatch] = useState([])
    const [heros, setHeros] = useState([])
    const [pros, setPros] = useState([])
    const [friends, setFriends] = useState([])
    const [topHeroes, setTopHeroes] = useState([])
    const [loading, setLoading] = useState(true)
    let [count, setCount] = useState(10)

    const top = [topHeroes[0], topHeroes[1], topHeroes[2], topHeroes[3], topHeroes[4], topHeroes[5], topHeroes[6], topHeroes[7], topHeroes[8], topHeroes[9]]

    //TODO: Fill out GetFriendsName => ()

    useEffect(() => {
        window.scrollTo(0, 0)
        axios
            .get(`https://api.opendota.com/api/players/${props.match.params.proPlayerId}/matches?limit=${count}`)
            .then(res => {
                setMatch(res.data)
                axios
                    .get('https://api.opendota.com/api/heroStats')
                    .then(res => {
                        setHeros(res.data)
                        axios
                            .get(`/user/me/pros/${props.dota_users_id}`)
                            .then(res => {
                                setPros(res.data)
                                axios
                                    .get(`/user/me/friends/${props.dota_users_id}`)
                                    .then(res => {
                                        setFriends(res.data)
                                        axios
                                            .get(`https://api.opendota.com/api/players/${props.match.params.proPlayerId}/heroes`)
                                            .then(res => {
                                                setTopHeroes(res.data)
                                            })
                                    })
                            })
                    })
            })
        setLoading(false)
    }, [count])



    function getPlayerName() {
        for (let i = 0; i < pros.length; i++) {
            //? == because the url is considered a string. 
            for (let g = 0; g < friends.length; g++) {
                if (pros[i].steam_account_id == props.match.params.proPlayerId) {
                    return pros[i].name
                } else if (friends[g].steam_account_id == props.match.params.proPlayerId) {
                    return friends[g].name
                }
            }
        }
    }




    const playedHeroes = top.map(topHero => {


        function convertEpochTime() {
            if (topHero) {
                let date = new Date(topHero.last_played * 1000)
                return date
            }
        }

        function getHeroPicture() {
            if (topHero) {
                for (let i = 0; i < heros.length; i++) {
                    console.log(topHero.hero_id)
                    if (heros[i].id == topHero.hero_id) {
                        return `${baseURL}${heros[i].img}`
                    }
                }
            }
        }

        function getTopGames() {
            if (topHero) {
                return topHero.games
            }
        }

        function handleWinPercent() {
            if (topHero) {
                    // let win = 0
                   let win = topHero.win / topHero.games * 100
                   console.log(win)
                   return win.toFixed(2)
            }
        }

        return (
            <div className='tophero-container'>
                <img className='tophero-img'
                    alt='hero picture'
                    src={getHeroPicture()} />
                <div>
                    <p>Last Played</p>
                    <p>{moment(convertEpochTime()).fromNow()}</p>
                </div>
                <div>
                    <p>{getTopGames()}</p>
                    <p>Games Played</p>
                </div>
                <div>
                    <p>{handleWinPercent()}</p>
                    <p>Win %</p>
                </div>
            </div>
        )
    })

    //        !!!!!         RECENT MATCHES MAP HERE          !!!!!

    const recentMatches = matches.map(match => {

        function determineWhoWon() {
            if (match.player_slot <= 4 && match.radiant_win === true) {
                return <h4 className='victory'>Victory!</h4>
            } if (match.player_slot <= 4 && match.radiant_win === false) {
                return <h4 className='defeat' >Defeat!</h4>
            } if (match.player_slot >= 125 && match.radiant_win === true) {
                return <h4 className='defeat' >Defeat!</h4>
            } if (match.player_slot >= 125 && match.radiant_win === false) {
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

        function convertEpochTime() {
            let date = new Date(match.start_time * 1000)
            return date
        }

        return (
            <Link to={`/${props.match.params.proPlayerId}/${match.match_id}/score`} style={{ textDecoration: 'none' }} >
                <div className='match-container'>
                    <img className='hero-picture'
                        alt='hero'
                        src={matchUpId()} />
                    <div className='winner-and-fromnow'>
                        {determineWhoWon()}
                        <p>{moment(convertEpochTime()).fromNow()}</p>
                    </div>
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
            {loading ? loadingGif : <h1>{getPlayerName()}'s favorite heroes!</h1>}

            {loading ? loadingGif : <div className='playedHeroes-and-peers'>
                <p className='playedHeroes-info'> Most Played Heroes All Time!</p>
                {playedHeroes}
            </div>}

            {loading ? loadingGif : <h2 className='h2-player-name'>{getPlayerName()}'s match history!</h2>}
            {loading ? loadingGif : <div>
                {recentMatches}
                <button className='more-btn'
                    onClick={() => setCount(count += 10)}>See 10 more recent matches!</button>
            </div>}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(RecentMatches)