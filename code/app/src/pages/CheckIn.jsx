import { useState, useRef, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CATEGORIES } from '../lib/categories'
import { saveCheckIn, updateCheckIn, getCheckInById } from '../lib/storage'
import ScoreSlider from '../components/ScoreSlider'

export default function CheckIn() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const editingCheckIn = editId ? getCheckInById(editId) : null

  const [scores, setScores] = useState(() => editingCheckIn ? { ...editingCheckIn.scores } : {})
  const [currentStep, setCurrentStep] = useState(0)
  const [showGuide, setShowGuide] = useState(true)
  const advanceTimer = useRef(null)

  const category = CATEGORIES[currentStep]
  const progress = Object.keys(scores).length
  const allDone = progress === CATEGORIES.length

  const handleScore = useCallback((value) => {
    setScores((prev) => ({ ...prev, [category.key]: value }))

    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    if (currentStep < CATEGORIES.length - 1) {
      advanceTimer.current = setTimeout(() => setCurrentStep((s) => s + 1), 800)
    }
  }, [category.key, currentStep])

  function handleSubmit() {
    if (editingCheckIn) {
      updateCheckIn(editingCheckIn.id, scores)
      navigate(`/results/${editingCheckIn.id}`)
    } else {
      const checkIn = saveCheckIn(scores)
      navigate(`/results/${checkIn.id}`)
    }
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
            ← {editingCheckIn ? 'Cancel' : 'Back'}
          </button>
          <span className="text-sm text-[var(--color-text-secondary)]">
            {editingCheckIn ? 'Editing' : `${progress}/${CATEGORIES.length}`}
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
          className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] p-6 mb-4 text-center animate-[fadeIn_200ms_ease-in-out]"
          key={category.key}
        >
          <div className="text-5xl mb-3">{category.emoji}</div>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-1">
            {category.label}
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            How satisfied are you with your {category.label.toLowerCase()}?
          </p>

          {/* Score slider */}
          <ScoreSlider
            value={scores[category.key]}
            onChange={handleScore}
          />
        </div>

        {/* Guidance section */}
        <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] mb-6 overflow-hidden animate-[fadeIn_200ms_ease-in-out]">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="w-full px-5 py-3 flex items-center justify-between cursor-pointer bg-transparent border-none text-left"
          >
            <span className="text-sm font-semibold text-[var(--color-primary)]">
              💡 How do I rate this?
            </span>
            <span
              className="text-[var(--color-text-secondary)] text-xs transition-transform duration-200"
              style={{ transform: showGuide ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              ▾
            </span>
          </button>

          {showGuide && (
            <div className="px-5 pb-4 animate-[fadeIn_200ms_ease-in-out]">
              {/* Guiding questions */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
                  Ask yourself
                </p>
                <ul className="space-y-1.5">
                  {category.questions.map((q, i) => (
                    <li key={i} className="text-sm text-[var(--color-text)] flex gap-2">
                      <span className="text-[var(--color-text-secondary)] shrink-0">•</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Level descriptions */}
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
                  Score guide
                </p>
                <div className="space-y-2">
                  {category.levels.map((level) => (
                    <div
                      key={level.range}
                      className="flex gap-3 items-start text-sm"
                    >
                      <span
                        className="shrink-0 inline-block w-10 text-center text-xs font-bold rounded-md py-0.5"
                        style={{
                          backgroundColor:
                            level.range.startsWith('1') ? 'var(--color-low)' :
                            level.range.startsWith('4') ? 'var(--color-medium)' :
                            level.range.startsWith('7') ? 'var(--color-high)' :
                            'var(--color-high)',
                          color: 'var(--color-surface)',
                          opacity: level.range.startsWith('9') ? 0.9 : 1,
                        }}
                      >
                        {level.range}
                      </span>
                      <div>
                        <span className="font-semibold text-[var(--color-text)]">
                          {level.label}
                        </span>
                        <span className="text-[var(--color-text-secondary)]">
                          {' — '}{level.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                  scores[cat.key] != null || i === currentStep ? 'var(--color-surface)' : 'var(--color-text-secondary)',
                opacity: scores[cat.key] != null && i !== currentStep ? 0.6 : 1,
              }}
              aria-label={`Go to ${cat.label}`}
            >
              {cat.emoji}
            </button>
          ))}
        </div>

      </div>

      {/* Sticky Save button at bottom */}
      {allDone && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-surface-alt)] border-t border-[var(--color-border)] animate-[fadeIn_300ms_ease-in-out]">
          <div className="max-w-lg mx-auto">
            <button
              onClick={handleSubmit}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-base cursor-pointer border-none transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{
                background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
              }}
            >
              {editingCheckIn ? 'Update Check-in ✓' : 'Save Check-in ✓'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
