import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Landing.css'

const loadingImg = 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif'

function Landing(props) {
    const [pros, setPros] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/dota-pros/pros').then(res => {
            setPros(res.data)
            setTimeout(() => setLoading(false), 500)
        }).catch(err => console.log(err))
    }, [])

    // const handleAddPro = () => {

    // }

    //TODO: need to wrap inside a link that when isLoggedIn on redux is true it will take them to recent matches.
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

            <div>
                <h3>{pro.name}</h3>
                <br />
                <p className='winnings'>Career winnings: ${pro.winnings}</p>
            </div>
            <button onClick={() => handleAddPro()}>add</button>
        </div>
    })

    return (
        <div className='main-landing-div'>
            <h2 className='landing-h2'>Select your players to follow!</h2>
            {loading === true ? <div>
                <h1>Getting Pros...</h1>
                <img src={loadingImg} />
            </div> : proPlayers}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(Landing)