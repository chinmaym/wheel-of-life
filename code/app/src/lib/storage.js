const STORAGE_KEY = 'wheel_of_life_data'

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { checkIns: [] }
    return JSON.parse(raw)
  } catch {
    return { checkIns: [] }
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function getCheckIns() {
  return loadData().checkIns.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  )
}

export function getLatestCheckIn() {
  const checkIns = getCheckIns()
  return checkIns.length > 0 ? checkIns[0] : null
}

export function saveCheckIn(scores) {
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
    overallScore,
  }

  data.checkIns.push(checkIn)
  saveData(data)
  return checkIn
}

export function deleteCheckIn(id) {
  const data = loadData()
  data.checkIns = data.checkIns.filter((c) => c.id !== id)
  saveData(data)
}
