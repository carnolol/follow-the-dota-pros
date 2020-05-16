import {Route, Switch} from 'react-router-dom'
import React from 'react'
import Auth from './components/auth/Auth'
import Landing from './components/Landing/Landing'
import UserInfo from './components/UserInfo/UserInfo'
import RecentMatches from './components/RecentMatches/RecentMatches'
import Score from './components/Score/Score'
import AboutUs from './components/Landing/AboutUs/AboutUs'


export default <Switch>
    <Route exact path='/' component={Landing}/> 
    <Route path='/login' component={Auth} />
    <Route path='/myProfile' component={UserInfo} />
    <Route path='/recent-matches/:proPlayerId' component={RecentMatches} />
    <Route path='/:proPlayerId/:matchId/score' component={Score} />
    <Route path='/about-us' component={AboutUs}/>
</Switch>