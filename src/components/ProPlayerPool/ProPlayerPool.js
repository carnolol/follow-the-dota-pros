import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

function ProPlayerPool(props) {

    const [pros, setPros] = useState([])
    //https://api.opendota.com/api/players/{account_id}/matches
    //props.match.params.proPlayerId
    useEffect(() => {
        axios
            .get(`/user/me/pros/${props.dota_users_id}`)
            .then(res => setPros(res.data))
            .catch(err => alert(err))
    }, [])

    // const playerMatches = []
    // const playerId = pros.forEach()

    const myPros = pros.map(pro => {
        return <div>
            <p>{pro.name}</p>
            <p>{pro.steam_account_id}</p>
            <Link to={`/recent-matches/${pro.steam_account_id}`} >
                <button>{pro.name}'s recent matches</button>
            </Link>
            <button>Delete</button>
        </div>
    })
    return (
        <div>
            {myPros}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(ProPlayerPool)