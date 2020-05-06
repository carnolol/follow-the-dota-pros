import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Landing.css'

const loadingImg = 'https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif'
const glass = 'https://www.pinclipart.com/picdir/middle/384-3841918_tool-clipart-mason-search-tool-png-transparent-png.png'
const add = 'https://cdn2.iconfinder.com/data/icons/everything-but-the-kitchen-sink-2/100/common-06-512.png'

//TODO: Need to make search function based on pros name
//TODO: let user filter based on winnings?

function Landing(props) {
    const [pros, setPros] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/dota-pros/pros').then(res => {
            setPros(res.data)
            setTimeout(() => setLoading(false), 1)
        }).catch(err => console.log(err))
    }, [])

    const proPlayers = pros.map(pro => {
        const handleAddPro = () => {
            axios
                .post(`/user/me/${pro.pro_player_id}`)
                .then(alert(`${pro.name} has been added to your pool!`))
        }
        return <div className='pro-container'>

            <Link to='to=/recent-matches/:proPlayerId'>
                <img className='pro-picture'
                    alt='pro'
                    src={pro.picture} />
            </Link>

            <div className='name-and-winnings'>
                <h3>{pro.name}</h3>
                <br />
                <p>Career winnings:</p>
                <p className='winnings'>${pro.winnings}</p>
            </div>
            <img className='landing-add-player'
                alt='add button'
                src={add}
                onClick={() => handleAddPro()} />
        </div>
    })

    return (
        <div className='main-landing-div'>
            <h2 className='landing-h2'>Select your players to follow!</h2>
            <div className='search-and-img-container'>
                <input className='search-input'
                    placeholder='Search by Name' />
                <img className='search-img'
                    src={glass}/>
            </div>
            {loading === true ? <div>
                <h1>Getting Pros...</h1>
                <img src={loadingImg}
                    alt='need new loading gif' />
            </div> : proPlayers}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(Landing)