import React, { useState, useContext, useEffect } from 'react'
import './CoinsTable.css'
import axios from 'axios'
import { CoinList } from '../../config/api'
import { CryptoContext } from '../../CryptoContext'
import { useNavigate } from 'react-router-dom'
import { numberWithCommas } from '../../helperFunctions'
import { FiSearch } from 'react-icons/fi'
import Pagination from '@mui/material/Pagination';
import useCurrentWidth from '../../hooks/useCurrentWidth'

function CoinsTable() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [searchElement, setSearchElement] = useState('') 
  const navigate = useNavigate()

  let width = useCurrentWidth()

  const { currency, symbol } = useContext(CryptoContext)

  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))
    
    setCoins(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCoins()
  }, [currency])

  useEffect(() => {
    setSearchElement(() => {
      const element = document.querySelector('.search-container')
      return element
    })
  }, [])

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  function handleSearchClick() {
    const elementProps = searchElement.getBoundingClientRect()
    if (elementProps.width === 52) {
      searchElement.style.width = '200px'
    } else if (elementProps.width > 52) {
      searchElement.style.width = '52px'
    }
  }

  return (
    <div className="CoinsTable">
      <div className="table-container">
        <table className="coins-table stickyTop">
          <thead className="table-head gray-font">
            <tr>
              { width > 768 && <th className="table-heading--left stickyTop">
                <h3 className="heading heading--3">#</h3>
              </th>}
              <th className="table-heading--left stickyTop">
                <h3 className="heading heading--3">Name</h3>
              </th>
              <th className="table-heading--left stickyTop">
                <h3 className="heading heading--3">Price</h3>
              </th>
              <th className="table-heading--center stickyTop">
                <h3 className="heading heading--3">24h %</h3>
              </th>
              { width > 768 && <th className="table-heading--right stickyTop">
                <h3 className="heading heading--3">Market Cap</h3>
              </th>}
            </tr>
          </thead>
          <tbody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row?.price_change_percentage_24h > 0
                  return (
                    <tr className="table-row"
                    onClick={() => navigate(`/dashboard/coins/${row?.id}`)}
                    key={row?.name}
                    >
                      { width > 768 && <th className="table-heading--left">
                        <h3 className="heading paragraph--2 coin-rank">{row?.market_cap_rank}</h3>
                      </th>}
                      <th className="table-heading--left">
                        { width > 768 && 
                          <div className="coin-name-image">
                            <img src={row?.image} height={30} />
                            <h3 className="heading heading--3 paragraph--2">{row?.name}</h3>
                          </div>
                        }
                        { width < 768 && 
                          <> 
                            <div className="coin-name-image">
                              <h3 className="heading heading--3 paragraph--2 gray-font coin-rank">{row?.market_cap_rank}</h3>
                              <img src={row?.image} height={30} />
                              <h3 className="heading heading--3 paragraph--2 uppercase">{row?.symbol}</h3>                          
                            </div>
                          </>
                        }
                      </th>
                      <th className="table-heading--left">
                        <h3 className="heading heading--3 paragraph--2">{symbol}{numberWithCommas(row?.current_price.toFixed(2))}</h3>
                      </th>
                      <th className="table-heading--center">
                        <h3 className="heading heading--3 paragraph--2"
                          style={{
                            color: profit > 0 ? "#2ecc71" : "#e74c3c"
                          }}
                        >
                          {profit && "+"}
                          {row?.price_change_percentage_24h.toFixed(2)}%
                        </h3>
                      </th>
                      { width > 768 && <th className="table-heading--right">
                        <h3 className="heading heading--3 paragraph--2">
                          {symbol}{" "}
                          {numberWithCommas(
                            row?.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </h3>
                      </th>}
                    </tr>
                  )
                })  
              }
              <tr className="hidden">
                <th>spacer</th>
              </tr>
              <tr className="hidden">
                <th>spacer</th>
              </tr>
              <tr className="hidden">
                <th>spacer</th>
              </tr>
              { width < 768 && <>
                <tr className="hidden">
                  <th>spacer</th>
                </tr>
                <tr className="hidden">
                  <th>spacer</th>
                </tr>
                <tr className="hidden">
                  <th>spacer</th>
                </tr>
              </>}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <div className="search-container">
            <div className="search-onclick" onClick={handleSearchClick}></div>
            <div className="search-container_content">
              <div className="search-icon-container">
                <FiSearch className="table-search-icon" />
              </div>
              <input className="input" placeholder="Search coins" onChange={(e) => setSearch(e.target.value)}/>
            </div>
        </div>
        <Pagination 
          count={(handleSearch()?.length / 10).toFixed(0)}  
          className="pagination"
          onChange={(_, value) => {
            setPage(value)
            
          }}
        />
      </div>
    </div>
    
  )

}

export default CoinsTable