import React, { useContext } from 'react'
import './CurrencySwitch.css'
import { CryptoContext } from '../../CryptoContext'


function CurrencySwitch() {
  const { currency, setCurrency } = useContext(CryptoContext)

  function toggleTheme(event) {
    setCurrency(prev => prev === "NZD" ? "USD" : "NZD")
    const Switch = event.currentTarget
    if (currency === "NZD") {
      Switch.style.transform = "translate3d(50px, 0, 0px)"
    }
    if (currency === "USD") {
      Switch.style.transform = "translate3d(0px, 0, 0px)"
    }
  }

  return (
    <div className="CurrencySwitch">
        <div className="switch-container">
            <div className="switch" onClick={toggleTheme}>
                {currency === "NZD" ? <h3 className="heading subHeading--3">NZD</h3> :
                <h3 className="heading subHeading--3">USD</h3>}
            </div>
            <h3 className="heading subHeading--3 USD gray-font">USD</h3>
            <h3 className="heading subHeading--3 NZD gray-font">NZD</h3>
        </div>
    </div>
  )
}

export default CurrencySwitch