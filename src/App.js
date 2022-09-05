import React, { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './pages/dashboard/Dashboard'
import Sidepanel from './components/sidepanel/Sidepanel'
import ComingSoon from './pages/coming-soon/ComingSoon'


function App() {
  const [coins, setCoins] = useState([])
  
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path='/dashboard/*' element={<Dashboard coins={coins}/>}/>
        <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
        />
        <Route path='/coming-soon' element={<ComingSoon />}/>
      </Routes>
      <Sidepanel />
    </div>
  );
}

export default App;
