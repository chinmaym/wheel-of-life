import { useNavigate } from 'react-router-dom'
import { getLatestCheckIn, getCheckIns } from '../lib/storage'
import WheelChart from '../components/WheelChart'
import InsightsCard from '../components/InsightsCard'

export default function Home() {
  const navigate = useNavigate()
  const latest = getLatestCheckIn()
  const totalCheckIns = getCheckIns().length

  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)]">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
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

        {latest ? (
          <>
            {/* Wheel — tappable to see full results */}
            <div
              className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
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
              <WheelChart scores={latest.scores} size={280} showLabels={false} />
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
          </>
        ) : (
          /* Empty state */
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-8 text-center mb-4">
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
          {totalCheckIns > 0 && (
            <button
              onClick={() => navigate('/history')}
              className="flex-1 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200 hover:bg-gray-100 active:scale-[0.98]"
              style={{
                backgroundColor: 'white',
                color: 'var(--color-primary)',
                border: '1.5px solid var(--color-primary)',
              }}
            >
              History ({totalCheckIns})
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
