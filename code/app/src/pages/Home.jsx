import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLatestCheckIn, getCheckIns, getGoals, getGoalProgress } from '../lib/storage'
import { CATEGORIES } from '../lib/categories'
import { useTheme } from '../lib/theme'
import { getScoreColor } from '../lib/insights'
import WheelChart from '../components/WheelChart'
import InsightsCard from '../components/InsightsCard'

export default function Home() {
  const navigate = useNavigate()
  const latest = getLatestCheckIn()
  const totalCheckIns = getCheckIns().length
  const goals = getGoals()
  const goalProgress = latest ? getGoalProgress(goals, latest.scores) : []
  const { theme, setTheme } = useTheme()
  const [showSettings, setShowSettings] = useState(false)

  const hasGoals = Object.keys(goals).length > 0

  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)]">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6 relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="absolute right-0 top-0 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: showSettings ? 'var(--color-primary)' : 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: showSettings ? 'white' : 'var(--color-text-secondary)',
            }}
            aria-label="Settings"
          >
            <span className="text-sm">⚙️</span>
          </button>
          <h1
            className="text-2xl font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
            }}
          >
            Wheel of Life
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Track your life balance
          </p>
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div
            className="rounded-2xl shadow-sm border border-[var(--color-border)] p-5 mb-4 animate-[fadeIn_200ms_ease-in-out]"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <h3 className="text-sm font-semibold text-[var(--color-text)] mb-3">Appearance</h3>
            <div className="flex gap-2">
              {[
                { key: 'light', label: 'Light', icon: '☀️' },
                { key: 'dark', label: 'Dark', icon: '🌙' },
                { key: 'system', label: 'Auto', icon: '💻' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setTheme(opt.key)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium cursor-pointer border transition-all duration-200"
                  style={{
                    backgroundColor: theme === opt.key ? 'var(--color-primary)' : 'transparent',
                    borderColor: theme === opt.key ? 'var(--color-primary)' : 'var(--color-border)',
                    color: theme === opt.key ? 'white' : 'var(--color-text-secondary)',
                  }}
                >
                  <span className="mr-1">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {latest ? (
          <>
            {/* Wheel — tappable to see full results */}
            <div
              className="rounded-2xl shadow-sm border border-[var(--color-border)] p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
              style={{ backgroundColor: 'var(--color-surface)' }}
              onClick={() => navigate(`/results/${latest.id}`)}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-[var(--color-text-secondary)]">
                  Latest Check-in
                </h2>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {new Date(latest.timestamp).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <WheelChart scores={latest.scores} goals={hasGoals ? goals : undefined} size={280} showLabels={false} />
              <div className="text-center mt-2">
                <span className="text-3xl font-bold text-[var(--color-primary)]">
                  {latest.overallScore}
                </span>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  /10 overall
                </span>
              </div>
              <p className="text-xs text-center text-[var(--color-primary)] mt-2">
                Tap to see full breakdown →
              </p>
            </div>

            {/* Insights */}
            <InsightsCard scores={latest.scores} />

            {/* Goal progress */}
            {hasGoals && goalProgress.length > 0 && (
              <div
                className="rounded-2xl shadow-sm border border-[var(--color-border)] p-5 mt-4 animate-[fadeIn_200ms_ease-in-out]"
                style={{ backgroundColor: 'var(--color-surface)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
                    Goal Progress
                  </h3>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate('/goals') }}
                    className="text-xs cursor-pointer bg-transparent border-none"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Edit goals
                  </button>
                </div>
                <div className="space-y-3">
                  {goalProgress.map((gp) => {
                    const cat = CATEGORIES.find((c) => c.key === gp.categoryKey)
                    return (
                      <div key={gp.categoryKey}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{cat?.emoji}</span>
                            <span className="text-sm font-medium text-[var(--color-text)]">
                              {cat?.label}
                            </span>
                          </div>
                          <span
                            className="text-sm font-bold"
                            style={{ color: gp.isCompleted ? 'var(--color-high)' : 'var(--color-text)' }}
                          >
                            {gp.currentScore}/{gp.targetScore}
                            {gp.isCompleted && ' ✓'}
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${gp.progress}%`,
                              backgroundColor: gp.isCompleted ? 'var(--color-high)' : 'var(--color-primary)',
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty state */
          <div className="rounded-2xl shadow-sm border border-[var(--color-border)] p-8 text-center mb-4" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-lg font-bold text-[var(--color-text)] mb-2">
              Welcome!
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
              The Wheel of Life helps you visualize satisfaction across 8 key
              areas. Complete your first check-in to get started.
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate('/checkin')}
            className="flex-1 py-3 rounded-xl text-white font-semibold text-sm cursor-pointer border-none transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
            }}
          >
            {latest ? 'New Check-in' : 'Start Check-in'}
          </button>
          <button
            onClick={() => navigate('/goals')}
            className="py-3 px-5 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200 active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-primary)',
              border: '1.5px solid var(--color-primary)',
            }}
          >
            🎯 Goals
          </button>
          {totalCheckIns > 0 && (
            <button
              onClick={() => navigate('/history')}
              className="py-3 px-5 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200 active:scale-[0.98]"
              style={{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-secondary)',
                border: '1.5px solid var(--color-border)',
              }}
            >
              History
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
