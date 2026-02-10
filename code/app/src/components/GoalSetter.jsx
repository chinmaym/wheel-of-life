import { useState } from 'react'
import { getScoreColor } from '../lib/insights'

export default function GoalSetter({ category, currentScore, existingGoal, onSave, onDelete }) {
  const [targetScore, setTargetScore] = useState(existingGoal?.targetScore || Math.min((currentScore || 5) + 2, 10))
  const [targetDate, setTargetDate] = useState(existingGoal?.targetDate || '')
  const [isEditing, setIsEditing] = useState(!existingGoal)

  function handleSave() {
    onSave(category.key, targetScore, targetDate || null)
    setIsEditing(false)
  }

  function handleDelete() {
    onDelete(category.key)
    setIsEditing(true)
    setTargetScore(Math.min((currentScore || 5) + 2, 10))
    setTargetDate('')
  }

  if (!isEditing && existingGoal) {
    const progress = currentScore != null
      ? Math.min(Math.round((currentScore / existingGoal.targetScore) * 100), 100)
      : 0
    const isCompleted = currentScore >= existingGoal.targetScore

    return (
      <div
        className="rounded-xl border p-4 transition-all duration-200"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: isCompleted ? 'var(--color-high)' : 'var(--color-border)',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{category.emoji}</span>
            <span className="text-sm font-semibold text-[var(--color-text)]">{category.label}</span>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs cursor-pointer bg-transparent border-none"
            style={{ color: 'var(--color-primary)' }}
          >
            Edit
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-1">
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                backgroundColor: isCompleted ? 'var(--color-high)' : 'var(--color-primary)',
              }}
            />
          </div>
          <span className="text-sm font-bold shrink-0" style={{ color: isCompleted ? 'var(--color-high)' : 'var(--color-text)' }}>
            {currentScore ?? '–'}/{existingGoal.targetScore}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: isCompleted ? 'var(--color-high)' : 'var(--color-text-secondary)' }}>
            {isCompleted ? 'Goal reached!' : `${progress}% there`}
          </span>
          {existingGoal.targetDate && (
            <span className="text-xs text-[var(--color-text-secondary)]">
              By {new Date(existingGoal.targetDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </div>
      </div>
    )
  }

  // Editing / creating state
  return (
    <div
      className="rounded-xl border p-4 animate-[fadeIn_200ms_ease-in-out]"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{category.emoji}</span>
        <span className="text-sm font-semibold text-[var(--color-text)]">{category.label}</span>
        {currentScore != null && (
          <span className="text-xs text-[var(--color-text-secondary)] ml-auto">
            Current: {currentScore}
          </span>
        )}
      </div>

      {/* Target score selector */}
      <div className="mb-3">
        <label className="text-xs font-medium text-[var(--color-text-secondary)] block mb-2">
          Target score
        </label>
        <div className="flex gap-1.5 flex-wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <button
              key={n}
              onClick={() => setTargetScore(n)}
              className="w-9 h-9 rounded-lg text-sm font-bold cursor-pointer border-none transition-all duration-200 active:scale-95"
              style={{
                backgroundColor: targetScore === n ? 'var(--color-primary)' : 'transparent',
                color: targetScore === n ? 'white' : 'var(--color-text-secondary)',
                border: targetScore === n ? 'none' : '1.5px solid var(--color-border)',
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Target date */}
      <div className="mb-4">
        <label className="text-xs font-medium text-[var(--color-text-secondary)] block mb-2">
          Target date (optional)
        </label>
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm border"
          style={{
            backgroundColor: 'var(--color-surface-alt)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
          }}
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold cursor-pointer border-none transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}
        >
          Set Goal
        </button>
        {existingGoal && (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 rounded-xl text-sm cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-text-secondary)',
                border: '1.5px solid var(--color-border)',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2.5 rounded-xl text-sm cursor-pointer border-none transition-all duration-200"
              style={{ backgroundColor: 'var(--color-low)', color: 'white', opacity: 0.8 }}
            >
              Clear
            </button>
          </>
        )}
      </div>
    </div>
  )
}
