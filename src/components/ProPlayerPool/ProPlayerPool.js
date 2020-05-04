import React, { useState, useEffect } from 'react'
import './ProPlayerPool.css'
import axios from 'axios'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

const trash = 'https://cdn.iconscout.com/icon/premium/png-512-thumb/delete-1432400-1211078.png'
const loadingImg = 'https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif'

function ProPlayerPool(props) {

    const [pros, setPros] = useState([])
    const [loading, setLoading] = useState(true)
    //https://api.opendota.com/api/players/{account_id}/matches
    //props.match.params.proPlayerId
    useEffect(() => {
        axios
            .get(`/user/me/pros/${props.dota_users_id}`)
            .then(res =>{ 
                setPros(res.data)
                setTimeout(() => setLoading(false), 1)
                })
            .catch(err => console.log(err))
    }, [pros])

    const myPros = pros.map(pro => {
        const handleDeletePro = () => {
            axios
                .delete(`/user/me/${pro.id}`)
        }
        return <div className='main-pro-div'>
            <img className='proplayer-pic' 
                src={pro.picture}
                alt='pic'
                />
            <p>Name: {pro.name}</p>
            <Link to={`/recent-matches/${pro.steam_account_id}`} >
                <button>{pro.name}'s recent matches</button>
            </Link>
            <img className='delete-pro'
                alt='trashcan'
                src={trash}
                onClick={() => handleDeletePro()}
            />
            
        </div>
    })
    return (
        <div>
            <h2>My Players</h2>
            {loading === true ? <div>

                <h1>Spinning up the Database...</h1>
                <img alt='loading'
                    src={loadingImg}/>
                    
            </div> : myPros}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(ProPlayerPool)