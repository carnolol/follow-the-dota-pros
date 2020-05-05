import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Score.css'
import Comments from '../comments/Comments'
import MatchInfo from '../MatchInfo/MatchInfo'

const loadingGif = <img src='https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif'
    alt='loading'
    className='loading-gif' />
const baseURL = 'https://api.opendota.com'
const placeholder = 'https://lh3.googleusercontent.com/proxy/ejFwN58gaX8OmhCukm-k7g2CMRJhSblcTCfkuqTD9WJh59CMN38PZWRfeBIe-hmN28w1jHsNVX5-6xoBnx3na_tfB_POS6mWpYgOSfQK2A'

//TODO: need to style loadingGif to be in center of screen. 

function Score(props) {

    const [match, setMatch] = useState({})
    const [hero, setHero] = useState([])
    const [items, setItems] = useState({})
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`https://api.opendota.com/api/matches/${props.match.params.matchId}`)
            .then(res => {
                setMatch(res.data)
                axios.get('https://api.opendota.com/api/heroStats').then(res => {
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

    useEffect(() => {
        if (match.players) {
            const allPlayers = match.players.map(player => {
                return player.account_id
            })
            setPlayers(allPlayers)
        }
    }, [match.players])

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

    // const detailedInfo = Object.keys(match).map( info => {
    // return <p>{info[players]}</p>
    // })
    // console.log(detailedInfo)




    const dotaMatch = [match]

    // function dispay() {
    //     if (dotaMatch) {
    //         const proMatch = dotaMatch.map(game => {
    //             console.log(game.players)
    //             game.players.map(player => {
    //                 console.log(player)
    //             })
    //             // return <h1>{game.human_players}</h1>
    //             // game.map( player =>{
    //             // console.log(player)
    //             // })
    //         })
    //         return proMatch
    //     }
    // }

    function display() {
        if (match.players) {
            const matchInfo = match.players.map(player => {
                // console.log('inside display', player)
                return <div className='score-match-container'>
                    <img className='score-player-hero-pic'
                        alt='NA'
                        src={placeholder} />
                    <h1>{player.gold}</h1>
                </div>
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
                    <h1>{match.radiant_score} </h1>
                                -
                    <h1> {match.dire_score}</h1>
                </div>
                <p>{time(match.duration)}</p>
            </div>
            <div>
                {display()}
            </div>
            {/* {loading === true ? null : <MatchInfo />} */}
            {loading === true ? null : <Comments props={props} />}
        </div>
    )
}

export default Score