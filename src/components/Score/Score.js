import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'
import './Score.css'
import Comments from '../comments/Comments'
import moment from 'moment'

const loadingGif = <div className='loading-gif'>
    <h1>One moment while we fetch some data...</h1>
    <img src='https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif'
        alt='loading'
        className='loading-gif' />
</div>

const baseURL = 'https://api.opendota.com'

//TODO: need to style loadingGif to be in center of screen. 

function Score(props) {

    const [match, setMatch] = useState({})
    const [heros, setHero] = useState([])
    const [items, setItems] = useState({})
    const [loading, setLoading] = useState(true)
    const [chartData, setChartData] = useState({})
    const [lastHits, setLastHits] = useState({})


    useEffect(() => {
        window.scrollTo(0, 0)
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
                        // setTimeout(() => setLoading(false), 1000)
                    })
            })
        chart()
        lastHitChart()
        setLoading(false)
    }, [])

    function handleWhatTeamWon() {
        if (match.radiant_win === false) {
            return <h1 className='dire-victory'>DIRE VICTORY!</h1>
        } else {
            return <h1 className='radiant-victory'> RADIANT VICTORY!</h1>
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

    function lastHitChart() {
        let name = []
        let lastHits = []
        let denies = []

        axios
            .get(`https://api.opendota.com/api/matches/${props.match.params.matchId}`)
            .then(res => {
                for (const obj of res.data.players) {
                    name.push(obj.name)
                    lastHits.push(obj.last_hits)
                    denies.push(obj.denies)
                }
                setLastHits({
                    labels: name,
                    datasets: [
                        {
                            label: 'Last Hits',
                            data: lastHits,
                            backgroundColor: [
                                'rgba(132, 15, 148, .65)',
                                'rgba(132, 15, 148, .65)',
                                'rgba(132, 15, 148, .65)',
                                'rgba(132, 15, 148, .65)',
                                'rgba(132, 15, 148, .65)',
                                'rgba(132, 15, 148, .65)',
                                'rgba(132, 15, 148, .65)',
                                'rgba(132, 15, 148, .65)',
                                'rgba(132, 15, 148, .65)',
                                'rgba(132, 15, 148, .65)'
                            ],
                            borderWidth: 2
                        },
                        {
                            label: 'Denies',
                            data: denies,
                            backgroundColor: [
                                'rgba(255, 192, 20, .85)',
                                'rgba(255, 192, 20, .85)',
                                'rgba(255, 192, 20, .85)',
                                'rgba(255, 192, 20, .85)',
                                'rgba(255, 192, 20, .85)',
                                'rgba(255, 192, 20, .85)',
                                'rgba(255, 192, 20, .85)',
                                'rgba(255, 192, 20, .85)',
                                'rgba(255, 192, 20, .85)',
                                'rgba(255, 192, 20, .85)'
                            ],
                            borderWidth: 2
                        }
                    ]
                })
            })
            .catch(err => console.log(err))
    }

    function chart() {
        let dmg = []
        let healing = []
        let name = []
        axios
            .get(`https://api.opendota.com/api/matches/${props.match.params.matchId}`)
            .then(res => {
                for (const dataObj of res.data.players) {
                    dmg.push(dataObj.hero_damage)
                    healing.push(dataObj.hero_healing)
                    name.push(dataObj.name)
                }
                setChartData({
                    labels: name,
                    datasets: [
                        {
                            label: 'Damage Done',
                            data: dmg,
                            backgroundColor: [
                                'rgba(175, 40, 22, .8)',
                                'rgba(175, 40, 22, .8)',
                                'rgba(175, 40, 22, .8)',
                                'rgba(175, 40, 22, .8)',
                                'rgba(175, 40, 22, .8)',
                                'rgba(175, 40, 22, .8)',
                                'rgba(175, 40, 22, .8)',
                                'rgba(175, 40, 22, .8)',
                                'rgba(175, 40, 22, .8)',
                                'rgba(175, 40, 22, .8)'
                            ],
                            borderWidth: 2
                        },
                        {
                            label: 'Healing Done',
                            data: healing,
                            backgroundColor: [
                                'rgba(54, 114, 47, .85)',
                                'rgba(54, 114, 47, .85)',
                                'rgba(54, 114, 47, .85)',
                                'rgba(54, 114, 47, .85)',
                                'rgba(54, 114, 47, .85)',
                                'rgba(54, 114, 47, .85)',
                                'rgba(54, 114, 47, .85)',
                                'rgba(54, 114, 47, .85)',
                                'rgba(54, 114, 47, .85)',
                                'rgba(54, 114, 47, .85)'
                            ],
                            borderWidth: 2
                        }
                    ]
                })
            })
            .catch(err => console.log(err))
    }

    //! !!!!!!!!!       RADIANT MAP STARTS HERE        !!!!!!!

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

                function getItemTime() {
                    let list = []
                    let purchasedItems = []
                    if (match.players) {
                        for (let i = 0; i < player.purchase_log.length; i++) {
                            purchasedItems.push(player.purchase_log[i])
                            console.log(purchasedItems)
                        }

                        // if (player.purchase_log[i].key ===)
                        // for(let key in items){
                        //     console.log('inside for in loop: ', player.purchase_log[5].key)
                        //    if(items[key] === player.purchase_log){
                        //    }
                        // }
                    }
                }

                console.log(getItemTime())

                function getItemPicture() {
                    let list = []
                    if (match.players) {
                        for (let key in items) {
                            if (items[key].id === player.item_0 || items[key].id === player.item_1 || items[key].id === player.item_2 || items[key].id === player.item_3 || items[key].id === player.item_4 || items[key].id === player.item_5) {

                                list.push(items[key])
                            }
                        }
                    }
                    return list
                }

                let item = getItemPicture()     //! DONT DELETE           

                if (player.player_slot <= 6) {
                    return <div className='score-match-container-rad'>
                        <div className='score-player-hero-pic' >
                            <img className='score-player-hero-pic'
                                alt='NA'
                                src={getHeroPicture()} />
                            <div className='hero-level'>{player.level}</div>
                        </div>
                        <div className='name-tower-dmg'>
                            <h4 className='player-name-game'>{player.name ? player.name : `Anon`}</h4>
                            <div>
                                <br></br>
                                <p className='match-stats-info'>Building Dmg</p>
                                <p>{player.tower_damage}</p>
                            </div>
                        </div>
                        <div className='player-text-info'>
                            <div>
                                <p className='match-stats-info'>KDA</p>
                                <p>{player.kills}/{player.deaths}/{player.assists}</p>
                            </div>
                            <div>
                                <p className='match-stats-info'>
                                    GPM {'&'} XPM
                                </p>
                                <p>{player.gold_per_min} / {player.xp_per_min}</p>
                            </div>
                        </div>
                        {loading ? null : <div className='dota-items'>
                            {item[0] ? <img className='dota-item-picture'
                                alt='item'
                                src={`${baseURL}${item[0].img}`} /> : null}
                            {item[1] ? <img className='dota-item-picture'
                                alt='item'
                                src={`${baseURL}${item[1].img}`} /> : null}
                            {item[2] ? <img className='dota-item-picture'
                                alt='item'
                                src={`${baseURL}${item[2].img}`} /> : null}
                            {item[3] ? <img className='dota-item-picture'
                                alt='item'
                                src={`${baseURL}${item[3].img}`} /> : null}
                            {item[4] ? <img className='dota-item-picture'
                                alt='item'
                                src={`${baseURL}${item[4].img}`} /> : null}
                            {item[5] ? <img className='dota-item-picture'
                                alt='item'
                                src={`${baseURL}${item[5].img}`} /> : null}
                        </div>}

                    </div>
                }
            })
            return matchInfo
        }
    }

    //! !!!!!!!!!       DIRE MAP STARTS HERE        !!!!!!!

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

                function getItemPicture() {
                    let list = []
                    if (match.players) {
                        for (let key in items) {
                            if (items[key].id === player.item_0 || items[key].id === player.item_1 || items[key].id === player.item_2 || items[key].id === player.item_3 || items[key].id === player.item_4 || items[key].id === player.item_5) {

                                list.push(items[key])
                            }
                        }
                    }
                    return list
                }

                let item = getItemPicture()     //! DONT DELETE           

                if (player.player_slot >= 125) {
                    return <div className='score-match-container-dire'>
                        <div className='score-player-hero-pic'>
                            <img className='score-player-hero-pic'
                                alt='NA'
                                src={getHeroPicture()} />
                            <div className='hero-level'>{player.level}</div>
                        </div>
                        <div className='name-tower-dmg'>
                            <h4 className='player-name-game'>{player.name ? player.name : `Anon`}</h4>
                            <div>
                                <br></br>
                                <p className='match-stats-info'>Building Dmg</p>
                                <p>{player.tower_damage}</p>
                            </div>
                        </div>
                        <div className='player-text-info'>
                            <div>
                                <p className='match-stats-info'>KDA</p>
                                <p>{player.kills}/{player.deaths}/{player.assists}</p>
                            </div>
                            <div>
                                <p className='match-stats-info'>
                                    GPM {'&'} XPM
                                </p>
                                <p>{player.gold_per_min} / {player.xp_per_min}</p>
                            </div>
                        </div>
                        {loading ? null : <div className='dota-items'>
                            {item[0] ? <img className='dota-item-picture'
                                alt='item'
                                src={`${baseURL}${item[0].img}`} /> : null}
                            {item[1] ? <img className='dota-item-picture'
                                alt='item'
                                src={`${baseURL}${item[1].img}`} /> : null}
                            {item[2] ? <img className='dota-item-picture'
                                alt='item'
                                src={`${baseURL}${item[2].img}`} /> : null}
                            {item[3] ? <img className='dota-item-picture'
                                alt='item'
                                src={`${baseURL}${item[3].img}`} /> : null}
                            {item[4] ? <img className='dota-item-picture'
                                alt='item'
                                src={`${baseURL}${item[4].img}`} /> : null}
                            {item[5] ? <img className='dota-item-picture'
                                alt='item'
                                src={`${baseURL}${item[5].img}`} /> : null}
                        </div>}

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
                <br></br>
                {handleWhatTeamWon()}
                <div className='scores'>
                    <h1 className='rad-score'>{match.radiant_score} </h1>
                                -
                    <h1 className='dire-score'> {match.dire_score}</h1>
                </div>
                <p className='time'>{time(match.duration)}</p>
                <br></br>
                <p>{moment(convertEpochTime()).fromNow()}</p>
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
                <br></br>
                <div className='match-score-info-container'>
                    <br></br>
                    <p className='hero-kda-info'>hero player KDA GPM/XPM  DMG Items</p>
                    <div className='players-container'>
                        {displayDire()}
                    </div>
                </div>
            </div>
            <div className='charts'>

                <Bar data={chartData}
                    options={{
                        responsive: true,
                        title: { text: 'Damage & Healing', display: true },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: false
                                }
                            }],
                            xAxes: [{
                                gridLines: {
                                    display: false
                                }
                            }]
                        }
                    }} />
                <Bar data={lastHits}
                    options={{
                        responsive: true,
                        title: { text: 'Last Hits & Denies', display: true },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: false
                                }
                            }],
                            xAxes: [{
                                gridLines: {
                                    display: false
                                }
                            }]
                        }
                    }} />
            </div>
            {/* <Comments props={props} /> */}
            {loading === true ? null : <Comments props={props} />}
        </div>
    )
}

export default Score