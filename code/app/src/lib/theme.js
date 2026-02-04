import { useState, useEffect } from 'react'

const THEME_KEY = 'wol_theme'

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'system'
  } catch {
    return 'system'
  }
}

function getEffectiveTheme(preference) {
  if (preference === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return preference
}

function applyTheme(effective) {
  document.documentElement.classList.toggle('dark', effective === 'dark')
}

export function useTheme() {
  const [theme, setThemeState] = useState(getStoredTheme)
  const [isDark, setIsDark] = useState(() => getEffectiveTheme(getStoredTheme()) === 'dark')

  useEffect(() => {
    const effective = getEffectiveTheme(theme)
    setIsDark(effective === 'dark')
    applyTheme(effective)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    function onChange(e) {
      setIsDark(e.matches)
      applyTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [theme])

  function setTheme(value) {
    setThemeState(value)
  }

  function cycleTheme() {
    setThemeState((prev) => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'system'
      return 'light'
    })
  }

  return { theme, setTheme, cycleTheme, isDark }
}
