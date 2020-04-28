import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import {withRouter} from 'react-router-dom'
import routes from './routes'

function App() {
  return (
    <div className="App">
     {props.location.pathname === '/login' ? null : <Header/>}
     {routes}
    </div>
  );
}

export default withRouter(App);
