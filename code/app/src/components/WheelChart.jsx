import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { CATEGORIES } from '../lib/categories'

export default function WheelChart({ scores, goals, size = 300, showLabels = true }) {
  const data = CATEGORIES.map((cat) => ({
    category: showLabels ? cat.label : cat.emoji,
    score: scores[cat.key] ?? 0,
    ...(goals && goals[cat.key] ? { goal: goals[cat.key].targetScore } : {}),
    fullMark: 10,
  }))

  const hasGoals = goals && Object.keys(goals).length > 0

  return (
    <div className="flex justify-center">
      <ResponsiveContainer width="100%" height={size}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="var(--color-border)" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fontSize: showLabels ? 11 : 16, fill: 'var(--color-text-secondary)' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }}
            tickCount={6}
          />
          {/* Goal overlay — dashed line behind the score */}
          {hasGoals && (
            <Radar
              name="Goal"
              dataKey="goal"
              stroke="var(--color-secondary)"
              fill="var(--color-secondary)"
              fillOpacity={0.08}
              strokeWidth={1.5}
              strokeDasharray="5 4"
              strokeOpacity={0.5}
              animationDuration={800}
            />
          )}
          <Radar
            name="Score"
            dataKey="score"
            stroke="var(--color-primary)"
            fill="var(--color-primary)"
            fillOpacity={0.25}
            strokeWidth={2}
            animationDuration={800}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              fontSize: '13px',
              color: 'var(--color-text)',
            }}
          />
          {hasGoals && (
            <Legend
              wrapperStyle={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
