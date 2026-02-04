import { CATEGORIES } from './categories'

export function getInsights(scores) {
  const entries = CATEGORIES.map((cat) => ({
    ...cat,
    score: scores[cat.key],
  }))

  const sorted = [...entries].sort((a, b) => a.score - b.score)
  const lowest = sorted.filter((e) => e.score <= 4)
  const highest = sorted.filter((e) => e.score >= 8).reverse()

  const needsAttention = lowest.length > 0 ? lowest : sorted.slice(0, 2)

  return { needsAttention, strengths: highest }
}

export function getScoreColor(score) {
  if (score <= 4) return 'var(--color-low)'
  if (score <= 6) return 'var(--color-medium)'
  return 'var(--color-high)'
}

export function getScoreLabel(score) {
  if (score <= 3) return 'Needs attention'
  if (score <= 5) return 'Room to grow'
  if (score <= 7) return 'Good'
  return 'Thriving'
}
