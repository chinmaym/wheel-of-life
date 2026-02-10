import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CheckIn from './pages/CheckIn'
import History from './pages/History'
import Results from './pages/Results'
import Compare from './pages/Compare'
import Goals from './pages/Goals'
import Onboarding from './components/Onboarding'
import { isOnboardingComplete, completeOnboarding } from './lib/onboarding'
import './App.css'

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(!isOnboardingComplete())

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/history" element={<History />} />
        <Route path="/results/:id" element={<Results />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
      {showOnboarding && (
        <Onboarding
          onComplete={() => {
            completeOnboarding()
            setShowOnboarding(false)
          }}
        />
      )}
    </BrowserRouter>
  )
}
