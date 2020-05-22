import React, { useState, useEffect } from 'react'
import './ProPlayerPool.css'
import axios from 'axios'
import Footer from '../Footer/Footer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
            .then(res => {
                setPros(res.data)
                setTimeout(() => setLoading(false), 1)
            })
            .catch(err => console.log(err))
            
    }, [pros])




        //      !!!!! MAP STARTS HERE !!!!!!

    const myPros = pros.map(pro => {

        
        const handleDeletePro = () => {
            axios
                .delete(`/user/me/${pro.id}`)
        }


        return (
            
                <div className='main-pro-div'>
                <Link to={`/recent-matches/${pro.steam_account_id}`} 
                style={{textDecoration: 'none'}}>
                    <img className='proplayer-pic'
                        src={pro.picture}
                        alt='pic'
                    />
                     </Link>
                        <h3 className='pro-name'>{pro.name}</h3>

                        <img className='delete-pro'
                            alt='trashcan'
                            src={trash}
                            onClick={() => handleDeletePro()}
                        />
                    {/* <div className='name-match-button'> */}
                    {/* </div> */}

                </div>
        )
    })
    return (
        <div className='OMEGA-DIV'>
            <h2 className='players-h2'>My Players</h2>
            <div className='pro-return-main-div'>
                {loading === true ? <div>

                    <h1>Spinning up the Database...</h1>
                    <img alt='loading'
                        src={loadingImg} />

                </div> : myPros}
            </div>
            <Footer/>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(ProPlayerPool)