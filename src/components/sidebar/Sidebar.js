import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { MdSpaceDashboard } from 'react-icons/md'
import { MdSell } from 'react-icons/md'
import { MdCollectionsBookmark } from 'react-icons/md'
import { BsFillPeopleFill } from 'react-icons/bs'
import { HiOutlineCurrencyDollar } from 'react-icons/hi'
import { IoMdSwitch } from 'react-icons/io'
import { MdOutlineClear } from 'react-icons/md'
import ThemeSwitch from '../theme-switch/ThemSwitch'
import { Link } from 'react-router-dom'
import useCurrentWidth from '../../hooks/useCurrentWidth'
import CurrencySwitch from '../currency-switch/CurrencySwitch'

function Sidebar() {
    const [activeFloater, setActiveFloater] = useState('')
    const [sidebar, setSidebar] = useState('')

    let width = useCurrentWidth()

    if (width > 1025 && sidebar) {
        sidebar.style.left = "0px"
        activeFloater.style.top = "120px"
    } else if (width < 1025 && sidebar) {
        sidebar.style.left = "-350px"
        activeFloater.style.top = "107.5px"
    }

    useEffect(() => {
        setActiveFloater(prev => {
            const element = document.querySelector('.active--floater')
            return element
        })
        setSidebar(() => {
            const element = document.querySelector('.Sidebar--fixed')
            return element
        })
    }, [])

    function handleClick(event) {
        const moveY = event.currentTarget.getBoundingClientRect().top
        activeFloater.style.top = moveY + 10 + "px"

        const prevActive = document.querySelector('.active-link')
        const active = event.currentTarget
        prevActive?.classList.remove('active-link')
        active?.classList.add('active-link')
    }

    function handleExitSidebar() {
        const elementProps = sidebar.getBoundingClientRect()
        if (elementProps.left < 0) {
            sidebar.style.left = '0px'
        } else if (elementProps.left === 0) {
            sidebar.style.left = '-350px'
        }
    }

    return (
        <div className="Sidebar--fixed"> 
            <div className="Sidebar">
                <div></div>
                <div className="Sidebar_block block--header">
                    <div>
                        <h1 className="heading heading--2"><span id="color-blue">Crypto</span>fy</h1>
                        <h3 className="heading subHeading--1">Charts & Insight.</h3>
                    </div>
                    <div className="Sidebar-exit-icon" onClick={handleExitSidebar}>
                        <MdOutlineClear />
                    </div>
                </div>

                <div className="Sidebar_block block--main">
                    <Link to="/dashboard"><div className="block--item active-link" onClick={handleClick}><MdSpaceDashboard className="icons" /><h3 className="heading heading--3">DashBoard</h3></div></Link>
                    <Link to="/coming-soon"><div className="block--item" onClick={handleClick}><MdSell /><h3 className="heading heading--3">Marketplace</h3><p className="heading subHeading--3 gray-font coming-soon">coming soon</p></div></Link>
                </div>

                <div className="Sidebar_block block--profile">
                    <h3 className="heading subHeading--2">PROFILE</h3>
                    <Link to="/coming-soon"><div className="block--item" onClick={handleClick}><MdCollectionsBookmark /><h3 className="heading heading--3">My Collections</h3><p className="heading subHeading--3 gray-font coming-soon">coming soon</p></div></Link>
                    <Link to="/coming-soon"><div className="block--item" onClick={handleClick}><BsFillPeopleFill /><h3 className="heading heading--3">Community</h3><p className="heading subHeading--3 gray-font coming-soon">coming soon</p></div></Link>
                </div>

                <div className="Sidebar_block block--others">
                    <h3 className="heading subHeading--2">OTHERS</h3>
                    <div className="block--item heading heading--3"><HiOutlineCurrencyDollar id="dollar-svg" /><h3 className="heading heading--3">Currency</h3><CurrencySwitch /></div>
                    <div className="block--item heading heading--3"><IoMdSwitch id="theme-svg" /><h3 className="heading heading--3">Theme Mode</h3><ThemeSwitch /></div>
                </div>
                <div className="active--floater"></div>
            </div>
        </div>
    )
}

export default Sidebar