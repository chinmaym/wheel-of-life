import { getInsights } from '../lib/insights'

export default function InsightsCard({ scores }) {
  const { needsAttention, strengths } = getInsights(scores)

  return (
    <div className="space-y-4">
      {needsAttention.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-red-700 mb-2">
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
                <span className="font-semibold text-red-600">
                  {item.score}/10
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {strengths.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-green-700 mb-2">
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
                <span className="font-semibold text-green-600">
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
