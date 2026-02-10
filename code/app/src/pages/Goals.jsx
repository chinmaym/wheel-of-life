import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../lib/categories'
import { getGoals, saveGoal, deleteGoal, getLatestCheckIn } from '../lib/storage'
import GoalSetter from '../components/GoalSetter'

export default function Goals() {
  const navigate = useNavigate()
  const [goals, setGoals] = useState(getGoals)
  const latest = getLatestCheckIn()

  function handleSave(categoryKey, targetScore, targetDate) {
    saveGoal(categoryKey, targetScore, targetDate)
    setGoals(getGoals())
  }

  function handleDelete(categoryKey) {
    deleteGoal(categoryKey)
    setGoals(getGoals())
  }

  const activeGoalCount = Object.keys(goals).length
  const completedCount = latest
    ? Object.entries(goals).filter(
        ([key, goal]) => (latest.scores[key] || 0) >= goal.targetScore
      ).length
    : 0

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
          {activeGoalCount > 0 && (
            <span className="text-sm text-[var(--color-text-secondary)]">
              {completedCount}/{activeGoalCount} reached
            </span>
          )}
        </div>

        <div className="text-center mb-6">
          <h1
            className="text-2xl font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
            }}
          >
            Your Goals
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Set targets for each area of your life
          </p>
        </div>

        {/* Goal setters for each category */}
        <div className="space-y-3">
          {CATEGORIES.map((category) => (
            <GoalSetter
              key={category.key}
              category={category}
              currentScore={latest?.scores[category.key] ?? null}
              existingGoal={goals[category.key] || null}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Tip text */}
        {activeGoalCount === 0 && (
          <div
            className="mt-6 rounded-2xl border p-5 text-center"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Set goals to track your progress over time. Your goals will appear on the
              wheel chart and home screen so you can see how you're doing at a glance.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
