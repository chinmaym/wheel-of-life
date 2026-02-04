import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCheckIns } from '../lib/storage'
import { CATEGORIES } from '../lib/categories'
import { getScoreColor } from '../lib/insights'
import ComparisonChart from '../components/ComparisonChart'

function formatDate(ts) {
  return new Date(ts).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function Compare() {
  const navigate = useNavigate()
  const checkIns = getCheckIns()
  const [idA, setIdA] = useState(checkIns[1]?.id || '')
  const [idB, setIdB] = useState(checkIns[0]?.id || '')

  const a = checkIns.find((c) => c.id === idA)
  const b = checkIns.find((c) => c.id === idB)

  const deltas = a && b
    ? CATEGORIES.map((cat) => ({
        ...cat,
        scoreA: a.scores[cat.key],
        scoreB: b.scores[cat.key],
        delta: b.scores[cat.key] - a.scores[cat.key],
      })).sort((x, y) => Math.abs(y.delta) - Math.abs(x.delta))
    : []

  const biggestImprovement = deltas.find((d) => d.delta > 0)
  const biggestDrop = deltas.find((d) => d.delta < 0)

  if (checkIns.length < 2) {
    return (
      <div className="min-h-screen bg-[var(--color-surface-alt)]">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="text-[var(--color-text-secondary)] text-sm cursor-pointer bg-transparent border-none"
            >
              ← Back
            </button>
            <h1 className="text-lg font-bold text-[var(--color-text)]">Compare</h1>
            <div className="w-12" />
          </div>
          <div
            className="rounded-2xl shadow-sm border border-[var(--color-border)] p-8 text-center"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <div className="text-4xl mb-3">📊</div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              You need at least 2 check-ins to compare. Complete another check-in first.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const labelA = formatDate(a?.timestamp || '')
  const labelB = formatDate(b?.timestamp || '')

  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)]">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-[var(--color-text-secondary)] text-sm cursor-pointer bg-transparent border-none"
          >
            ← Back
          </button>
          <h1 className="text-lg font-bold text-[var(--color-text)]">Compare</h1>
          <div className="w-12" />
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-1 block">
              Older
            </label>
            <select
              value={idA}
              onChange={(e) => setIdA(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm border cursor-pointer"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              {checkIns.map((c) => (
                <option key={c.id} value={c.id}>
                  {formatDate(c.timestamp)} — {c.overallScore}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-1 block">
              Newer
            </label>
            <select
              value={idB}
              onChange={(e) => setIdB(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm border cursor-pointer"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              {checkIns.map((c) => (
                <option key={c.id} value={c.id}>
                  {formatDate(c.timestamp)} — {c.overallScore}
                </option>
              ))}
            </select>
          </div>
        </div>

        {a && b && idA !== idB && (
          <>
            {/* Overlay chart */}
            <div
              className="rounded-2xl shadow-sm border border-[var(--color-border)] p-4 mb-4"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <ComparisonChart
                scoresA={a.scores}
                scoresB={b.scores}
                labelA={labelA}
                labelB={labelB}
                size={280}
              />
            </div>

            {/* Overall comparison */}
            <div
              className="rounded-2xl shadow-sm border border-[var(--color-border)] p-4 mb-4"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3 text-center">
                Overall Score
              </p>
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <span className="text-3xl font-bold text-[var(--color-primary)]">{a.overallScore}</span>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">Older</p>
                </div>
                <span className="text-2xl text-[var(--color-text-secondary)]">→</span>
                <div className="text-center">
                  <span className="text-3xl font-bold text-[var(--color-primary)]">{b.overallScore}</span>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">Newer</p>
                </div>
                {b.overallScore !== a.overallScore && (
                  <span
                    className="text-lg font-bold"
                    style={{
                      color: b.overallScore > a.overallScore ? 'var(--color-high)' : 'var(--color-low)',
                    }}
                  >
                    {b.overallScore > a.overallScore ? '+' : ''}
                    {Math.round((b.overallScore - a.overallScore) * 10) / 10}
                  </span>
                )}
              </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {biggestImprovement && (
                <div
                  className="border rounded-xl p-3 text-center"
                  style={{ backgroundColor: 'var(--color-high-surface)', borderColor: 'var(--color-high-border)' }}
                >
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-high-text)' }}>
                    Biggest Gain
                  </p>
                  <div className="text-2xl mb-1">{biggestImprovement.emoji}</div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-high-text)' }}>
                    {biggestImprovement.label} +{biggestImprovement.delta}
                  </p>
                </div>
              )}
              {biggestDrop && (
                <div
                  className="border rounded-xl p-3 text-center"
                  style={{ backgroundColor: 'var(--color-low-surface)', borderColor: 'var(--color-low-border)' }}
                >
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-low-text)' }}>
                    Biggest Drop
                  </p>
                  <div className="text-2xl mb-1">{biggestDrop.emoji}</div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-low-text)' }}>
                    {biggestDrop.label} {biggestDrop.delta}
                  </p>
                </div>
              )}
            </div>

            {/* Diff table */}
            <div
              className="rounded-2xl shadow-sm border border-[var(--color-border)] p-4 mb-4"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">
                Category Changes
              </p>
              <div className="space-y-2.5">
                {deltas.map((d) => (
                  <div key={d.key} className="flex items-center gap-2 text-sm">
                    <span className="w-6 text-center">{d.emoji}</span>
                    <span className="flex-1 text-[var(--color-text)]">{d.label}</span>
                    <span className="w-8 text-center" style={{ color: getScoreColor(d.scoreA) }}>
                      {d.scoreA}
                    </span>
                    <span className="text-[var(--color-text-secondary)]">→</span>
                    <span className="w-8 text-center" style={{ color: getScoreColor(d.scoreB) }}>
                      {d.scoreB}
                    </span>
                    <span
                      className="w-10 text-right font-semibold"
                      style={{
                        color: d.delta > 0 ? 'var(--color-high)' : d.delta < 0 ? 'var(--color-low)' : 'var(--color-text-secondary)',
                      }}
                    >
                      {d.delta > 0 ? '+' : ''}{d.delta === 0 ? '—' : d.delta}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {a && b && idA === idB && (
          <div
            className="rounded-2xl shadow-sm border border-[var(--color-border)] p-8 text-center"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <p className="text-sm text-[var(--color-text-secondary)]">
              Select two different check-ins to compare.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
