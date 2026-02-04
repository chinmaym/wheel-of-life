import { getScoreColor } from '../lib/insights'

export default function ScoreButton({ value, selected, onClick }) {
  const isSelected = value === selected
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className="w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border-2"
      style={{
        backgroundColor: isSelected ? getScoreColor(value) : 'transparent',
        color: isSelected ? 'var(--color-surface)' : 'var(--color-text-secondary)',
        borderColor: isSelected ? getScoreColor(value) : 'var(--color-border)',
        transform: isSelected ? 'scale(1.15)' : 'scale(1)',
      }}
      aria-label={`Rate ${value} out of 10`}
    >
      {value}
    </button>
  )
}
