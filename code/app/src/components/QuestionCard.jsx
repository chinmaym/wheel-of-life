import { getScoreColor } from '../lib/insights'

export default function QuestionCard({ question, questionIndex, totalQuestions, selectedIndex, onSelect }) {
  return (
    <div className="mb-5">
      {/* Question header */}
      <div className="flex items-start gap-2 mb-3">
        <span
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            backgroundColor: selectedIndex != null ? 'var(--color-primary)' : 'var(--color-border)',
            color: selectedIndex != null ? 'white' : 'var(--color-text-secondary)',
          }}
        >
          {questionIndex + 1}
        </span>
        <p className="text-sm font-medium text-[var(--color-text)] leading-snug">
          {question.text}
        </p>
      </div>

      {/* Answer options */}
      <div className="space-y-2 pl-8">
        {question.answers.map((answer, idx) => {
          const isSelected = selectedIndex === idx
          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className="w-full text-left px-4 py-3 rounded-xl text-sm cursor-pointer border transition-all duration-200 active:scale-[0.98]"
              style={{
                backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface)',
                borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                color: isSelected ? 'white' : 'var(--color-text)',
              }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                  style={{
                    borderColor: isSelected ? 'white' : 'var(--color-border)',
                    backgroundColor: isSelected ? 'white' : 'transparent',
                  }}
                >
                  {isSelected && (
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    />
                  )}
                </span>
                {answer.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
