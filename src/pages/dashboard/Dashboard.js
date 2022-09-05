import React from 'react'
import './Dashboard.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './sub-pages/home-page/HomePage'
import CoinPage from './sub-pages/coin-page/CoinPage'

function Dashboard() {
  return (
    <div className="Dashboard">
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
    </div>
  )
}

export default Dashboard