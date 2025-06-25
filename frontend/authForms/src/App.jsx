import React from 'react'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import VerifyOtp from './components/VerifyOtp'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="//verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
