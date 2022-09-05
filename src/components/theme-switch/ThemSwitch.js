import React, { useState, useEffect, useContext } from 'react'
import './ThemeSwitch.css'
import { BsFillSunFill } from 'react-icons/bs'
import { BsFillMoonFill } from 'react-icons/bs'
import { CryptoContext } from '../../CryptoContext'

function ThemeSwitch() {
  const [root, setRoot] = useState('')
  const { theme, setTheme } = useContext(CryptoContext)

  useEffect(() => {
    setRoot(() => {
      const element = document.querySelector(':root')
      return element
    })
  }, [])

  function toggleTheme(event) {
    setTheme(prev => prev === "light" ? "dark" : "light")
    const Switch = event.currentTarget
    if (theme === "light") {
      Switch.style.transform = "translate3d(40px, 0, 0px)"

      root?.style.setProperty('--main-color', '#fdfdfd')
      root?.style.setProperty('--secondary-color', '#d4eaff')
      root?.style.setProperty('--third-color', '#2d2d2d')
      root?.style.setProperty('--main-bg-color', '#2d2d2d')
      root?.style.setProperty('--secondary-bg-color', '#252525')
      root?.style.setProperty('--third-bg-color', '#ffffff')
      root?.style.setProperty('--color-blue', '#d4eaff')
      root?.style.setProperty('--bg-color-gray', '#252525')
      root?.style.setProperty('--box-shadow-color', '#0a0a0a')

    }
    if (theme === "dark") {
      Switch.style.transform = "translate3d(0px, 0, 0px)"

      root?.style.setProperty('--main-color', '#2d2d2d')
      root?.style.setProperty('--secondary-color', '#96a0b5')
      root?.style.setProperty('--third-color', '#ffffff')
      root?.style.setProperty('--main-bg-color', '#ffffff')
      root?.style.setProperty('--secondary-bg-color', '#f7f9fc')
      root?.style.setProperty('--third-bg-color', '#2d2d2d')
      root?.style.setProperty('--color-blue', '#2081e2')
      root?.style.setProperty('--bg-color-gray', '#edeef5')
      root?.style.setProperty('--box-shadow-color', '#f5f5f5')

    }
  }

  return (
    <div className="ThemeSwitch">
        <div className="switch-container">
          <div className="switch" onClick={toggleTheme}>
            {theme === "light" ? <BsFillSunFill id="switch-svg" /> :
            <BsFillMoonFill id="switch-svg"/>}
          </div>
        </div>
    </div>
  )
}

export default ThemeSwitch