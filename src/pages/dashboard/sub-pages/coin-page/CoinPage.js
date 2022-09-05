import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './CoinPage.css'
import { CryptoContext } from '../../../../CryptoContext'
import { SingleCoin } from '../../../../config/api'
import CoinChart from '../../../../components/coin-chart/CoinChart'
import Header from '../../../../components/header/Header'
import { AiOutlineFall } from 'react-icons/ai'
import { AiOutlineRise } from 'react-icons/ai'


function CoinPage() {
    const { id } = useParams()
    const [coin, setCoin] = useState()
    const { currency, symbol } = useContext(CryptoContext)

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id))
        setCoin(data)
    }

    useEffect(() => {
        fetchCoin()
    }, [currency])

    const profit = coin?.market_data.price_change_percentage_24h > 0

    return (
        <div className="CoinPage">
            <Header page={coin?.name} />
            <div className="CoinPage-content">
                <div className="top-content">
                    <div className="left-content"> 
                        <img src={coin?.image.large}/>
                        <div className="symbol">
                            <h3 className="heading subHeading--3 uppercase">{coin?.symbol}</h3>
                        </div>
                    </div>
                    <div className="center-content">
                        <h2 className="heading heading--2">${currency === "NZD" ? coin?.market_data?.current_price.nzd : coin?.market_data?.current_price.usd}</h2>
                        <div className="current-price">
                            <h3 className="heading subHeading--3">Current Price</h3>
                        </div>
                    </div>
                </div>
                
                <div className="right-content">
                    <div>
                        {!profit && <AiOutlineFall id="falling"/>}
                        {profit && <AiOutlineRise id="rising" />}
                    </div>
                    <div className="price-change">
                        <p className="heading subHeading--3">{coin?.market_data.price_change_percentage_24h.toFixed(2)}%</p>
                    </div>
                    <div className="hour24">
                        <p className="heading subHeading--3">24 Hour</p>
                    </div>
                </div>
            </div>
            <div>
                <CoinChart coin={coin} />
            </div>
        </div>
    )
}

export default CoinPage