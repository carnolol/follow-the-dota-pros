import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Score.css'
import Comments from '../comments/Comments'
import MatchInfo from '../MatchInfo/MatchInfo'

const loadingGif = <img src='https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif'
    alt='loading'
    className='loading-gif' />
const baseURL = 'https://api.opendota.com'

//TODO: need to style loadingGif to be in center of screen. 

function Score(props) {

    const [match, setMatch] = useState({})
    const [hero, setHero] = useState([])
    const [items, setItems] = useState({})
    const [players, setPlayers] =useState([])
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
                    // getPlayer()
                    setLoading(false)
                    })
            })
    }, [])

    useEffect(() => {
        if(match.players){
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


    // function getRadiantInfo(){
    //     for(let i = 0; i < match.length; i++)
    //     return match
    // }

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
            {/* {detailedInfo} */}
            {loading === true ? null : <MatchInfo />}
            {loading === true ? null : <Comments />}
        </div>
    )
}

export default Score