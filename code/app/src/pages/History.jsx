import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCheckIns } from '../lib/storage'
import { CATEGORIES } from '../lib/categories'
import { getScoreColor } from '../lib/insights'
import WheelChart from '../components/WheelChart'

export default function History() {
  const navigate = useNavigate()
  const checkIns = getCheckIns()
  const [expandedId, setExpandedId] = useState(null)

  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)]">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-[var(--color-text-secondary)] text-sm cursor-pointer bg-transparent border-none"
          >
            ← Back
          </button>
          <h1 className="text-lg font-bold text-[var(--color-text)]">
            History
          </h1>
          <div className="w-12" />
        </div>

        {checkIns.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-8 text-center">
            <div className="text-4xl mb-3">📊</div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              No check-ins yet. Complete your first one to see history.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {checkIns.map((checkIn) => {
              const isExpanded = expandedId === checkIn.id
              return (
                <div
                  key={checkIn.id}
                  className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : checkIn.id)
                    }
                    className="w-full p-4 flex items-center justify-between cursor-pointer bg-transparent border-none text-left"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text)]">
                        {new Date(checkIn.timestamp).toLocaleDateString(
                          undefined,
                          {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                        {new Date(checkIn.timestamp).toLocaleTimeString(
                          undefined,
                          { hour: '2-digit', minute: '2-digit' }
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span
                          className="text-xl font-bold"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {checkIn.overallScore}
                        </span>
                        <span className="text-xs text-[var(--color-text-secondary)]">
                          /10
                        </span>
                      </div>
                      <span
                        className="text-[var(--color-text-secondary)] transition-transform duration-200"
                        style={{
                          transform: isExpanded
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                        }}
                      >
                        ▾
                      </span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 animate-[fadeIn_200ms_ease-in-out]">
                      <WheelChart
                        scores={checkIn.scores}
                        size={220}
                        showLabels={false}
                      />
                      <div className="mt-3 space-y-2">
                        {CATEGORIES.map((cat) => {
                          const score = checkIn.scores[cat.key]
                          return (
                            <div
                              key={cat.key}
                              className="flex items-center gap-2 text-sm"
                            >
                              <span className="w-6 text-center">
                                {cat.emoji}
                              </span>
                              <span className="flex-1 text-[var(--color-text-secondary)]">
                                {cat.label}
                              </span>
                              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{
                                    width: `${score * 10}%`,
                                    backgroundColor: getScoreColor(score),
                                  }}
                                />
                              </div>
                              <span
                                className="w-8 text-right font-semibold"
                                style={{ color: getScoreColor(score) }}
                              >
                                {score}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
