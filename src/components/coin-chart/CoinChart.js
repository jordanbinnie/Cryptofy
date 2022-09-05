import React, { useState, useEffect, useContext } from 'react'
import './CoinChart.css'
import axios from 'axios'
import { CryptoContext } from '../../CryptoContext'
import { HistoricalChart } from '../../config/api'
import { chartDays } from '../../config/data'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useCurrentWidth from '../../hooks/useCurrentWidth'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function CoinChart({ coin }) {
  const [historicData, setHistoricData] = useState(null);
  const [days, setDays] = useState(1);
  const [coinChartElement, setCoinChartElement] = useState('')
  const [chartElement, setChartElement] = useState('')
  const { currency, theme } = useContext(CryptoContext)

  let width = useCurrentWidth()
  
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  };

  
  const data = {
    labels: historicData?.map((coin, index) => {
      let date = new Date(coin[0])
      let time = 
      date.getHours() > 12
      ? `${date.getHours() - 12}:${date.getMinutes()}`
      : `${date.getHours()}:${date.getMinutes()}`
      return days === 1 ? time : date.toLocaleDateString()
    }),
    
    datasets: [
      {
        label: `Price ( Past ${days} Days ) in ${currency}`,
        data: historicData?.map((coin) => coin[1]),
        borderColor: theme === "light" ? '#2081e2' : "#d4eaff",
        backgroundColor: theme === "light" ? '#2081e2' : "#d4eaff",
        color: "red",
      },
    ],
  };

  const config = {
    type: 'line',
    data,
    options: {
      scales: {

      }
    }
  }

  const getAspectRatio = () => {
    if (width < 480) return 1/1.5
    if (width > 480 && width < 1900) return 1/1
    if (width > 1900) return 1/0.4
  }
  
  const options = {
    aspectRatio: getAspectRatio(),
    fontSize: 20,
    scales: {
      y: {
        ticks: {
          color: theme === "light" ? "#2d2d2d" : "#ffffff",
        },
        grid: {
          display: false,
          borderColor: theme === "light" ? "#edeef5" : "#252525",
          borderWidth: 2
        }
      },
      x: {
        ticks: {
          color: theme === "light" ? "#2d2d2d" : "#ffffff",
          maxTicksLimit: 5,
          maxRotation: 0,
          minRotation: 0,
        },
        grid: {
          display: false,
          borderColor: theme === "light" ? "#edeef5" : "#252525",
          borderWidth: 2
        }
      }
    },

    elements: {
      point: {
        radius: 1,
      },
      line: {
        borderWidth: 2,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: theme === "light" ? "#2d2d2d" : "#ffffff",
        },
      },
      datalabels: {
        weight: 'bold',
      }
    },
  };
  
    useEffect(() => {

      fetchHistoricData()

    }, [days, coin]);


    useEffect(() => {
      setCoinChartElement(() => {
        const element = document.querySelector('.CoinChart')
        return element
      })
      setChartElement(() => {
        const element = document.querySelector('.line-graph') 
        return element
      })
      if (coinChartElement) {
        const element = document.querySelector('.Dashboard')
        const elementProps = element.getBoundingClientRect().width
        coinChartElement.style.width = elementProps - 30 + "px"
      }
      if (chartElement) {
        chartElement.style.width = '100%'
        chartElement.style.height = 'auto'
      }
    }, [coinChartElement, chartElement])

    useEffect(() => {
      if (coinChartElement) {
        const element = document.querySelector('.Dashboard')
        const elementProps = element.getBoundingClientRect().width
        coinChartElement.style.width = elementProps - 30 + "px"
      }
    }, [width])

    return (
      <div className="CoinChart">
        <Line className="line-graph" options={options} data={data} />
        <div className="chart-buttons-container">
          {chartDays?.map(day => {

            const selected = day.value === days ? "selected" : ""

            return (
            <a key={day.value} onClick={() => setDays(day.value)}>
              <p id={selected} className="chart-button heading subHeading--3">{day.label}</p>
            </a>
          )})}
        </div>
      </div>
    )
}

export default CoinChart