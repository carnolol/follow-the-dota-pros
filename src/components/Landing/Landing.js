import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Landing.css'

const loadingImg = 'https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif'
const glass = 'https://i.etsystatic.com/17857814/r/il/1e14b2/1578632427/il_570xN.1578632427_i01w.jpg'
const add = 'https://cdn2.iconfinder.com/data/icons/everything-but-the-kitchen-sink-2/100/common-06-512.png'

//TODO: Need to make search function based on pros name
//TODO: let user filter based on winnings?

function Landing(props) {
    const [pros, setPros] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios
            .get('/dota-pros/pros')
            .then(res => {
            setPros(res.data)
            setTimeout(() => setLoading(false), 1)
        }).catch(err => console.log(err))
    }, [])

    function handleSearch(){
        axios
            .get(`/dota-pros/pros?search=${search}`)
            .then(res => {
                setPros(res.data)
            })
            .catch(err => console.log(err))
    }

    function handleReset(){
        axios
            .get('dota-pros/pros')
            .then( res => {
                setPros(res.data)
            })
            .catch(err => console.log(err))
            setSearch('')
    }

    //       !!!!!!!        MAP STARTS HERE        !!!!!!!!!!

    const proPlayers = pros.map(pro => {
        const handleAddPro = () => {
            axios
                .post(`/user/me/${pro.pro_player_id}`)
                .then(alert(`${pro.name} has been added to your pool!`))
        }
        return <div className='pro-container'>

            <Link to={`/recent-matches/${pro.steam_account_id}`}>
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

    //!    !!!!!!!!!!!       MAIN RETURN HERE     !!!!!!!!!!!!!!!

    return (
        <div className='main-landing-div'>
            <h2 className='landing-h2'>Select your players to follow!</h2>
            <div className='search-and-img-container'>
                <input className='search-input'
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search by Name' />
                <img className='search-img'
                    onClick={() => handleSearch()}
                    alt='mag glass'
                    src={glass}/>
                <button className='search-reset'
                    onClick={() => handleReset()}>Reset</button>
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