import { useState } from 'react'
import { getScoreColor, getScoreLabel } from '../lib/insights'

export default function ScoreSlider({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value ?? 5)
  const hasValue = value != null

  const displayValue = hasValue ? value : localValue
  const pct = ((displayValue - 1) / 9) * 100

  function handleChange(e) {
    const v = Number(e.target.value)
    setLocalValue(v)
    onChange(v)
  }

  return (
    <div className="w-full px-2">
      {/* Large score display */}
      <div className="text-center mb-1">
        <span
          className="text-6xl font-bold transition-colors duration-200"
          style={{ color: getScoreColor(displayValue) }}
        >
          {displayValue}
        </span>
        <span className="text-lg text-[var(--color-text-secondary)]">/10</span>
      </div>
      <p
        className="text-center text-sm font-medium mb-6 transition-colors duration-200"
        style={{ color: getScoreColor(displayValue) }}
      >
        {getScoreLabel(displayValue)}
      </p>

      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={displayValue}
          onChange={handleChange}
          className="score-slider w-full"
          style={{
            '--slider-pct': `${pct}%`,
            '--slider-color': getScoreColor(displayValue),
          }}
          aria-label={`Score: ${displayValue} out of 10`}
        />
      </div>

      {/* Min/max labels */}
      <div className="flex justify-between mt-1 text-xs text-[var(--color-text-secondary)]">
        <span>1</span>
        <span>10</span>
      </div>
    </div>
  )
}
