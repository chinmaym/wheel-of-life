import { useState, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CATEGORIES, calculateScoresFromAnswers } from '../lib/categories'
import { saveCheckIn, updateCheckIn, getCheckInById } from '../lib/storage'
import QuestionCard from '../components/QuestionCard'

export default function CheckIn() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const editingCheckIn = editId ? getCheckInById(editId) : null

  // answers: { health: [0, 2, 1], career: [3, 1, 2], ... }
  // Each array holds the selected answer index for each question in that category
  const [answers, setAnswers] = useState(() =>
    editingCheckIn?.answers && Object.keys(editingCheckIn.answers).length > 0
      ? { ...editingCheckIn.answers }
      : {}
  )
  const [currentStep, setCurrentStep] = useState(0)

  const category = CATEGORIES[currentStep]
  const categoryAnswers = answers[category.key] || []
  const allQuestionsAnswered = categoryAnswers.length === category.questions.length &&
    categoryAnswers.every((a) => a != null)

  // Count how many categories are fully answered
  const completedCategories = CATEGORIES.filter((cat) => {
    const a = answers[cat.key] || []
    return a.length === cat.questions.length && a.every((v) => v != null)
  }).length
  const allDone = completedCategories === CATEGORIES.length
  const isLastStep = currentStep === CATEGORIES.length - 1

  const handleAnswerSelect = useCallback((questionIndex, answerIndex) => {
    setAnswers((prev) => {
      const current = [...(prev[category.key] || [])]
      current[questionIndex] = answerIndex
      return { ...prev, [category.key]: current }
    })
  }, [category.key])

  function handleNext() {
    if (currentStep < CATEGORIES.length - 1) {
      setCurrentStep((s) => s + 1)
    }
  }

  function handlePrev() {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }

  function handleSubmit() {
    const scores = calculateScoresFromAnswers(answers)
    if (editingCheckIn) {
      updateCheckIn(editingCheckIn.id, scores, answers)
      navigate(`/results/${editingCheckIn.id}`)
    } else {
      const checkIn = saveCheckIn(scores, answers)
      navigate(`/results/${checkIn.id}`)
    }
  }

  // Calculate a preview score for the current category if all questions are answered
  const previewScore = allQuestionsAnswered
    ? (() => {
        const values = categoryAnswers.map(
          (idx, qIdx) => category.questions[qIdx].answers[idx].value
        )
        const avg = values.reduce((a, b) => a + b, 0) / values.length
        return Math.round(avg * 10) / 10
      })()
    : null

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
            {editingCheckIn ? 'Editing' : `${completedCategories}/${CATEGORIES.length}`}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-[var(--color-border)] rounded-full mb-8 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(completedCategories / CATEGORIES.length) * 100}%`,
              background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
            }}
          />
        </div>

        {/* Category card with questions */}
        <div
          className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] p-6 mb-4 animate-[fadeIn_200ms_ease-in-out]"
          key={category.key}
        >
          <div className="text-center mb-5">
            <div className="text-5xl mb-3">{category.emoji}</div>
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-1">
              {category.label}
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Answer the questions below
            </p>
          </div>

          {/* Questions */}
          {category.questions.map((question, qIdx) => (
            <QuestionCard
              key={qIdx}
              question={question}
              questionIndex={qIdx}
              totalQuestions={category.questions.length}
              selectedIndex={categoryAnswers[qIdx] ?? null}
              onSelect={(answerIdx) => handleAnswerSelect(qIdx, answerIdx)}
            />
          ))}

          {/* Preview score when all questions answered */}
          {previewScore != null && (
            <div
              className="mt-4 pt-4 text-center animate-[fadeIn_200ms_ease-in-out]"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <span className="text-sm text-[var(--color-text-secondary)]">Your score: </span>
              <span className="text-2xl font-bold text-[var(--color-primary)]">{previewScore}</span>
              <span className="text-sm text-[var(--color-text-secondary)]">/10</span>
            </div>
          )}
        </div>

        {/* Step navigation dots */}
        <div className="flex gap-2 justify-center flex-wrap mb-4">
          {CATEGORIES.map((cat, i) => {
            const catAnswers = answers[cat.key] || []
            const catDone = catAnswers.length === cat.questions.length &&
              catAnswers.every((v) => v != null)
            return (
              <button
                key={cat.key}
                onClick={() => setCurrentStep(i)}
                className="w-8 h-8 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 border-none"
                style={{
                  backgroundColor:
                    catDone
                      ? 'var(--color-primary)'
                      : i === currentStep
                        ? 'var(--color-border)'
                        : 'transparent',
                  color:
                    catDone || i === currentStep ? 'var(--color-surface)' : 'var(--color-text-secondary)',
                  opacity: catDone && i !== currentStep ? 0.6 : 1,
                }}
                aria-label={`Go to ${cat.label}`}
              >
                {cat.emoji}
              </button>
            )
          })}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3 mb-6">
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              className="flex-1 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200 active:scale-[0.98]"
              style={{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-secondary)',
                border: '1.5px solid var(--color-border)',
              }}
            >
              ← Previous
            </button>
          )}
          {!isLastStep ? (
            <button
              onClick={handleNext}
              disabled={!allQuestionsAnswered}
              className="flex-1 py-3 rounded-xl text-white font-semibold text-sm cursor-pointer border-none transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allDone}
              className="flex-1 py-3 rounded-xl text-white font-semibold text-sm cursor-pointer border-none transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
              }}
            >
              {editingCheckIn ? 'Update Check-in ✓' : 'Save Check-in ✓'}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
