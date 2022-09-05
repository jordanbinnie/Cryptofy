import React, { useState, useEffect } from 'react'
import './Header.css'
import { HiMenu } from 'react-icons/hi'
import { HiMenuAlt3 } from 'react-icons/hi'

function Header({page}) {
    const [sidebar, setSidebar] = useState('')
    const [sidepanel, setSidepanel] = useState('')

    useEffect(() => {
        setSidebar(() => {
            const element = document.querySelector('.Sidebar--fixed')
            return element
        })
        setSidepanel(() => {
            const element = document.querySelector('.Sidepanel--fixed')
            return element
        })

    }, [])

    function handleSidepanel() {
        sidepanel.style.right = '0px'
    }

    function handleSidebar() {
        const elementProps = sidebar.getBoundingClientRect()
        if (elementProps.left < 0) {
            sidebar.style.left = '0px'
        } else if (elementProps.left === 0) {
            sidebar.style.left = '-450px'
        }
    }

    return (
        <div className="Header">
            <div className="left-content">
                <div className="menu-button-container" onClick={handleSidebar}>
                    <HiMenu />
                </div>
            </div>
            <div className="center-content">
                <div className="page-badge-container">
                    <h2 className="heading subHeading--1">{page}</h2>
                </div>
            </div>
            <div className="right-content">
                <div className="news-button-container" onClick={handleSidepanel}>
                    <h3 className="heading paragraph--2">
                        <HiMenuAlt3 />
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Header