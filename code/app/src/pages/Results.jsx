import { useNavigate, useParams } from 'react-router-dom'
import { getCheckIns } from '../lib/storage'
import { CATEGORIES } from '../lib/categories'
import { getScoreColor, getScoreLabel, getInsights } from '../lib/insights'
import WheelChart from '../components/WheelChart'

export default function Results() {
  const navigate = useNavigate()
  const { id } = useParams()
  const checkIns = getCheckIns()

  const checkIn = checkIns.find((c) => c.id === id)
  // Find the previous check-in (the one right before this one chronologically)
  const currentIndex = checkIns.findIndex((c) => c.id === id)
  const previous = currentIndex < checkIns.length - 1 ? checkIns[currentIndex + 1] : null

  if (!checkIn) {
    return (
      <div className="min-h-screen bg-[var(--color-surface-alt)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--color-text-secondary)]">Check-in not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-[var(--color-primary)] text-sm cursor-pointer bg-transparent border-none underline"
          >
            Go home
          </button>
        </div>
      </div>
    )
  }

  const { needsAttention, strengths } = getInsights(checkIn.scores)

  function getDelta(key) {
    if (!previous) return null
    return checkIn.scores[key] - previous.scores[key]
  }

  function getOverallDelta() {
    if (!previous) return null
    return Math.round((checkIn.overallScore - previous.overallScore) * 10) / 10
  }

  const overallDelta = getOverallDelta()

  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)]">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-2 animate-[fadeIn_300ms_ease-in-out]">
          <div className="text-4xl mb-2">🎉</div>
          <h1 className="text-xl font-bold text-[var(--color-text)]">
            Check-in Complete!
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {new Date(checkIn.timestamp).toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Overall score */}
        <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] p-5 mb-4 text-center animate-[fadeIn_400ms_ease-in-out]">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
            Overall Score
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-5xl font-bold text-[var(--color-primary)]">
              {checkIn.overallScore}
            </span>
            <span className="text-lg text-[var(--color-text-secondary)]">/10</span>
          </div>
          {overallDelta !== null && overallDelta !== 0 && (
            <p className="mt-1 text-sm font-medium" style={{
              color: overallDelta > 0 ? 'var(--color-high)' : overallDelta < 0 ? 'var(--color-low)' : 'var(--color-text-secondary)',
            }}>
              {overallDelta > 0 ? '↑' : '↓'} {Math.abs(overallDelta)} from last check-in
            </p>
          )}
          {!previous && checkIns.length === 1 && (
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              Your first check-in — great start!
            </p>
          )}
        </div>

        {/* Wheel chart */}
        <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] p-4 mb-4 animate-[fadeIn_500ms_ease-in-out]">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-2 text-center">
            Your Wheel
          </p>
          <WheelChart scores={checkIn.scores} size={280} showLabels={false} />
        </div>

        {/* Category breakdown */}
        <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] p-5 mb-4 animate-[fadeIn_600ms_ease-in-out]">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">
            Category Breakdown
          </p>
          <div className="space-y-3">
            {CATEGORIES.map((cat) => {
              const score = checkIn.scores[cat.key]
              const delta = getDelta(cat.key)
              return (
                <div key={cat.key}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      <span className="text-sm font-medium text-[var(--color-text)]">
                        {cat.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-bold"
                        style={{ color: getScoreColor(score) }}
                      >
                        {score}/10
                      </span>
                      {delta !== null && delta !== 0 && (
                        <span
                          className="text-xs font-medium"
                          style={{
                            color: delta > 0 ? 'var(--color-high)' : 'var(--color-low)',
                          }}
                        >
                          {delta > 0 ? '+' : ''}{delta}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${score * 10}%`,
                        backgroundColor: getScoreColor(score),
                      }}
                    />
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                    {getScoreLabel(score)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-3 mb-6 animate-[fadeIn_700ms_ease-in-out]">
          {strengths.length > 0 && (
            <div
              className="border rounded-xl p-4"
              style={{ backgroundColor: 'var(--color-high-surface)', borderColor: 'var(--color-high-border)' }}
            >
              <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-high-text)' }}>
                💪 Your Strengths
              </h3>
              <div className="space-y-1">
                {strengths.map((item) => (
                  <div key={item.key} className="flex items-center justify-between text-sm">
                    <span>{item.emoji} {item.label}</span>
                    <span className="font-semibold" style={{ color: 'var(--color-high-text)' }}>{item.score}/10</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {needsAttention.length > 0 && (
            <div
              className="border rounded-xl p-4"
              style={{ backgroundColor: 'var(--color-medium-surface)', borderColor: 'var(--color-medium-border)' }}
            >
              <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-medium-text)' }}>
                🎯 Focus Areas
              </h3>
              <p className="text-xs mb-2" style={{ color: 'var(--color-medium-text)' }}>
                Consider giving extra attention to these areas
              </p>
              <div className="space-y-1">
                {needsAttention.map((item) => (
                  <div key={item.key} className="flex items-center justify-between text-sm">
                    <span>{item.emoji} {item.label}</span>
                    <span className="font-semibold" style={{ color: 'var(--color-medium-text)' }}>{item.score}/10</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 animate-[fadeIn_800ms_ease-in-out]">
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 rounded-xl text-white font-semibold text-sm cursor-pointer border-none transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
            }}
          >
            Done
          </button>
          <button
            onClick={() => navigate(`/checkin?edit=${checkIn.id}`)}
            className="flex-1 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200 active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-primary)',
              border: '1.5px solid var(--color-primary)',
            }}
          >
            Edit
          </button>
          {checkIns.length > 1 && (
            <button
              onClick={() => navigate('/history')}
              className="flex-1 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200 active:scale-[0.98]"
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
