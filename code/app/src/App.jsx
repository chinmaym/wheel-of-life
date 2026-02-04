import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CheckIn from './pages/CheckIn'
import History from './pages/History'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}
