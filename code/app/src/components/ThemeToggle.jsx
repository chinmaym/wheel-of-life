import { useTheme } from '../lib/theme'

const labels = { light: 'Light', dark: 'Dark', system: 'Auto' }
const icons = { light: '☀️', dark: '🌙', system: '💻' }

export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme()

  return (
    <button
      onClick={cycleTheme}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium cursor-pointer border shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-text-secondary)',
      }}
      aria-label={`Theme: ${labels[theme]}. Click to change.`}
    >
      <span className="text-sm">{icons[theme]}</span>
      <span>{labels[theme]}</span>
    </button>
  )
}
