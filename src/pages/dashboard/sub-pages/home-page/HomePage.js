import React, { useState, useContext, useEffect } from 'react'
import './HomePage.css'
import Header from '../../../../components/header/Header'
import axios from 'axios'
import { TrendingCoins } from '../../../../config/api'
import { CryptoContext } from '../../../../CryptoContext'
import CoinsTable from '../../../../components/coins-table/CoinsTable'
import { numberWithCommas } from '../../../../helperFunctions'
import { useNavigate } from 'react-router-dom'


function HomePage() {
    const [trending, setTrending] = useState([])
    const [carousel, setCarousel] = useState('')

    const { currency } = useContext(CryptoContext)

    const navigate = useNavigate()

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }

    useEffect(() => {
        setCarousel(() => {
            const element = document.querySelector('.top-trending-carousel')
            return element
        })
    }, [])

    useEffect(() => {
        fetchTrendingCoins()
    }, [currency])

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }

    useEffect(() => {
        if (trending && carousel) { 
            setInterval(() => {
                carousel.style.transition = 'all 500ms ease-in-out 0s'
                const cardWidth = carousel?.firstChild?.getBoundingClientRect().width
                const width = cardWidth + 10
                carousel.style.transform = `translateX(-${width}px)`
                
                delay(500).then(() => {
                    carousel.append(carousel.firstChild)
                    carousel.style.transition = 'none'
                    carousel.style.transform = 'translateX(0px)'
                })

            }, 5000)
        }
    }, [carousel])

    const trendingCarousel = trending?.map((coin) => {
        return (
            <div key={coin?.id} className="trending-card" onClick={() => navigate(`/dashboard/coins/${coin.id}`)}>
                <div className="card-image-container">
                    <img className="card-image" src={coin?.image} />
                    <div className="card-rank-label">
                        <p className="heading paragraph--2">Rank {coin?.market_cap_rank}</p>
                    </div>
                </div>
                <div className="card-content">
                    <div className="card-content-flex">
                        <p className="heading paragraph--1 coin-name">{coin?.name}</p>
                        <p className="heading paragraph--2 gray-font">{coin?.symbol}</p>
                    </div>
                    <div className="card-content-flex">
                        <p className="heading paragraph--2 gray-font">Current price</p>
                        <p className="heading paragraph--2">${numberWithCommas(coin?.current_price.toFixed(2))}</p>
                    </div>
                </div>
            </div>
        )
    })

 
    return (
        <div className="HomePage">
            <Header page="Dashboard" />
            <div className="page-content">
                <h1 className="heading heading--2 top-trending-heading">Top 10 Trending</h1>
                <div className="top-trending">
                    <div className="top-trending-carousel">
                        {trendingCarousel}
                    </div>
                </div>
                <CoinsTable />

            </div>
        </div>
    )
}

export default HomePage