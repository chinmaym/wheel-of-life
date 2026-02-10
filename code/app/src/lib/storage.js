const STORAGE_KEY = 'wheel_of_life_data'

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { checkIns: [], goals: {} }
    const data = JSON.parse(raw)
    // Ensure goals property exists (backward compat)
    if (!data.goals) data.goals = {}
    return data
  } catch {
    return { checkIns: [], goals: {} }
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// ── Check-in functions ──────────────────────────────────────

export function getCheckIns() {
  return loadData().checkIns.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  )
}

export function getLatestCheckIn() {
  const checkIns = getCheckIns()
  return checkIns.length > 0 ? checkIns[0] : null
}

export function saveCheckIn(scores, answers) {
  const data = loadData()
  const values = Object.values(scores)
  const overallScore =
    Math.round((values.reduce((sum, v) => sum + v, 0) / values.length) * 10) /
    10

  const checkIn = {
    id: (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
      ? crypto.randomUUID()
      : Date.now().toString(36) + Math.random().toString(36).slice(2),
    timestamp: new Date().toISOString(),
    scores,
    answers: answers || {},
    overallScore,
  }

  data.checkIns.push(checkIn)
  saveData(data)
  return checkIn
}

export function getCheckInById(id) {
  const data = loadData()
  return data.checkIns.find((c) => c.id === id) || null
}

export function updateCheckIn(id, scores, answers) {
  const data = loadData()
  const index = data.checkIns.findIndex((c) => c.id === id)
  if (index === -1) return null

  const values = Object.values(scores)
  const overallScore =
    Math.round((values.reduce((sum, v) => sum + v, 0) / values.length) * 10) /
    10

  data.checkIns[index] = {
    ...data.checkIns[index],
    scores,
    answers: answers || data.checkIns[index].answers || {},
    overallScore,
    lastEditedAt: new Date().toISOString(),
  }

  saveData(data)
  return data.checkIns[index]
}

export function deleteCheckIn(id) {
  const data = loadData()
  data.checkIns = data.checkIns.filter((c) => c.id !== id)
  saveData(data)
}

// ── Goal functions ──────────────────────────────────────────

export function getGoals() {
  return loadData().goals || {}
}

export function saveGoal(categoryKey, targetScore, targetDate) {
  const data = loadData()
  data.goals[categoryKey] = {
    targetScore,
    targetDate: targetDate || null,
    createdAt: new Date().toISOString(),
  }
  saveData(data)
  return data.goals[categoryKey]
}

export function deleteGoal(categoryKey) {
  const data = loadData()
  delete data.goals[categoryKey]
  saveData(data)
}

export function getGoalProgress(goals, latestScores) {
  if (!goals || !latestScores) return []

  return Object.entries(goals).map(([categoryKey, goal]) => {
    const currentScore = latestScores[categoryKey] || 0
    const progress = Math.min(
      Math.round((currentScore / goal.targetScore) * 100),
      100
    )
    const isCompleted = currentScore >= goal.targetScore
    const isOverdue = goal.targetDate && new Date(goal.targetDate) < new Date() && !isCompleted

    return {
      categoryKey,
      targetScore: goal.targetScore,
      targetDate: goal.targetDate,
      currentScore,
      progress,
      isCompleted,
      isOverdue,
    }
  })
}
