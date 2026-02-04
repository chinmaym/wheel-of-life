import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../lib/categories'
import { saveCheckIn } from '../lib/storage'
import ScoreButton from '../components/ScoreButton'

export default function CheckIn() {
  const navigate = useNavigate()
  const [scores, setScores] = useState({})
  const [currentStep, setCurrentStep] = useState(0)

  const category = CATEGORIES[currentStep]
  const progress = Object.keys(scores).length
  const allDone = progress === CATEGORIES.length

  function handleScore(value) {
    const updated = { ...scores, [category.key]: value }
    setScores(updated)

    if (currentStep < CATEGORIES.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 200)
    }
  }

  function handleSubmit() {
    saveCheckIn(scores)
    navigate('/', { state: { justCompleted: true } })
  }

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
          <span className="text-sm text-[var(--color-text-secondary)]">
            {progress}/{CATEGORIES.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-[var(--color-border)] rounded-full mb-8 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(progress / CATEGORIES.length) * 100}%`,
              background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
            }}
          />
        </div>

        {/* Category card */}
        <div
          className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6 mb-6 text-center animate-[fadeIn_200ms_ease-in-out]"
          key={category.key}
        >
          <div className="text-5xl mb-3">{category.emoji}</div>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-1">
            {category.label}
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            How satisfied are you with your {category.label.toLowerCase()}?
          </p>

          {/* Score buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
              <ScoreButton
                key={value}
                value={value}
                selected={scores[category.key]}
                onClick={handleScore}
              />
            ))}
          </div>

          {scores[category.key] && (
            <p className="mt-4 text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
              You rated {category.label}: {scores[category.key]}/10
            </p>
          )}
        </div>

        {/* Step navigation */}
        <div className="flex gap-2 justify-center flex-wrap mb-6">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.key}
              onClick={() => setCurrentStep(i)}
              className="w-8 h-8 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 border-none"
              style={{
                backgroundColor:
                  scores[cat.key] != null
                    ? i === currentStep
                      ? 'var(--color-primary)'
                      : 'var(--color-primary)'
                    : i === currentStep
                      ? 'var(--color-border)'
                      : 'transparent',
                color:
                  scores[cat.key] != null || i === currentStep ? '#fff' : 'var(--color-text-secondary)',
                opacity: scores[cat.key] != null && i !== currentStep ? 0.6 : 1,
              }}
              aria-label={`Go to ${cat.label}`}
            >
              {cat.emoji}
            </button>
          ))}
        </div>

        {/* Submit */}
        {allDone && (
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl text-white font-semibold text-base cursor-pointer border-none transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
            }}
          >
            Save Check-in
          </button>
        )}
      </div>
    </div>
  )
}
