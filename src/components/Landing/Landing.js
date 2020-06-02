import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import Footer from '../Footer/Footer'
import './Landing.css'

const loadingImg = 'https://nerdylifeofmine.files.wordpress.com/2017/11/loading.gif'
const glass = 'https://i.etsystatic.com/17857814/r/il/1e14b2/1578632427/il_570xN.1578632427_i01w.jpg'
const add = 'https://cdn2.iconfinder.com/data/icons/everything-but-the-kitchen-sink-2/100/common-06-512.png'
// const checkmark = 'https://i.pinimg.com/originals/70/a5/52/70a552e8e955049c8587b2d7606cd6a6.gif'

//TODO: Add a <> tag about the websites MVP. Write ternary based off islogged in from redux to display a different h1. dont allow users to add players to pool unless props.isloggedIn == true

function Landing(props) {
    const [pros, setPros] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')


    useEffect(() => {
        axios
            .get('/dota-pros/pros')
            .then(res => {
                setPros(res.data)
                setTimeout(() => setLoading(false), 500)
            }).catch(err => console.log(err))
    }, [])

    function handleSearch() {
        axios
            .get(`/dota-pros/pros?search=${search.toLowerCase()}`)
            .then(res => {
                setPros(res.data)
            })
            .catch(err => console.log(err))
    }

    function handleReset() {
        axios
            .get('dota-pros/pros')
            .then(res => {
                setPros(res.data)
                setSearch('')
            })
            .catch(err => console.log(err))
    }

    // function displayCheckmark(){
    //     const check = setTimeout(() => {
    //        return <img className='landing-add-player'
    //         alt='checked?'
    //         src={checkmark}/> 
    //     }, 2000)
    //     return check
    // }

    // console.log(displayCheckmark())

    //       !!!!!!!        MAP STARTS HERE        !!!!!!!!!!

    const proPlayers = pros.map(pro => {


        const handleAddPro = () => {
            if (props.isloggedIn === true) {
                axios
                    .post(`/user/me/${pro.pro_player_id}`)
                    .then(
                        swal({
                            title: 'Success!',
                            text: `${pro.name} has successfully been added to your pool!`,
                            icon: 'success',
                            button: 'OK'
                        })
                        // displayCheckmark()
                    )
                    .catch(err => console.log(err))
            } else {
                swal('Must Login to use that feature', 'Please login first', 'error')
            }
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
                <h3 className='winnings'>${pro.winnings}</h3>
            </div>
            <img className='landing-add-player'
                alt='add button'
                src={add}
                onClick={() => { handleAddPro() }} />

        </div>
    })

    //!    !!!!!!!!!!!       MAIN RETURN HERE     !!!!!!!!!!!!!!!

    return (
        <div className='main-landing-div'>
            {loading ? null : props.isloggedIn ? <h2 className='landing-h2'>Select your players to follow!</h2> : <h2 className='landing-h2'>Login to Start following players!</h2>}

            {loading ? null : <div className='search-and-img-container'>
                <input className='search-input'
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search by Name' />
                <img className='search-img'
                    onClick={() => handleSearch()}
                    alt='mag glass'
                    src={glass} />
                <button className='search-reset'
                    onClick={() => handleReset()}>Reset</button>
            </div>}

            {loading ? (
                <div>
                    <h1>Getting Pros...</h1>
                    <img src={loadingImg}
                        className='loading'
                        alt='need new loading gif' />
                </div>
            ) : (
                    proPlayers)}

            {loading === true ? null :
                <Link to={'/about-us'} style={{ textDecoration: 'none' }}>
                    <h2 className='h2-learn'>Learn more about us here!</h2>
                </Link>}

            {loading === true ? null : <Footer />}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, null)(Landing)