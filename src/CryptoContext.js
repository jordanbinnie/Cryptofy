import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export const CryptoContext = createContext() 

function CryptoContextProvider({ children }) {
    const [theme, setTheme] = useState("light")
    const [currency, setCurrency] = useState("NZD")
    const [symbol, setSymbol] = useState("$")

    return (
        <CryptoContext.Provider value={{ currency, setCurrency, symbol, theme, setTheme }}>
            {children}
        </CryptoContext.Provider>
    )
}

export default CryptoContextProvider