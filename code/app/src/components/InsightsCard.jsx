import { getInsights } from '../lib/insights'

export default function InsightsCard({ scores }) {
  const { needsAttention, strengths } = getInsights(scores)

  return (
    <div className="space-y-4">
      {needsAttention.length > 0 && (
        <div
          className="border rounded-xl p-4"
          style={{ backgroundColor: 'var(--color-low-surface)', borderColor: 'var(--color-low-border)' }}
        >
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-low-text)' }}>
            Needs Attention
          </h3>
          <div className="space-y-1">
            {needsAttention.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between text-sm"
              >
                <span>
                  {item.emoji} {item.label}
                </span>
                <span className="font-semibold" style={{ color: 'var(--color-low-text)' }}>
                  {item.score}/10
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {strengths.length > 0 && (
        <div
          className="border rounded-xl p-4"
          style={{ backgroundColor: 'var(--color-high-surface)', borderColor: 'var(--color-high-border)' }}
        >
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-high-text)' }}>
            Strengths
          </h3>
          <div className="space-y-1">
            {strengths.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between text-sm"
              >
                <span>
                  {item.emoji} {item.label}
                </span>
                <span className="font-semibold" style={{ color: 'var(--color-high-text)' }}>
                  {item.score}/10
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
