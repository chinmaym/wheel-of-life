import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { CATEGORIES } from '../lib/categories'

export default function ComparisonChart({ scoresA, scoresB, labelA, labelB, size = 300 }) {
  const data = CATEGORIES.map((cat) => ({
    category: cat.emoji,
    [labelA]: scoresA[cat.key] ?? 0,
    [labelB]: scoresB[cat.key] ?? 0,
    fullMark: 10,
  }))

  return (
    <div className="flex justify-center">
      <ResponsiveContainer width="100%" height={size}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="var(--color-border)" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fontSize: 16, fill: 'var(--color-text-secondary)' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }}
            tickCount={6}
          />
          <Radar
            name={labelA}
            dataKey={labelA}
            stroke="var(--color-primary)"
            fill="var(--color-primary)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Radar
            name={labelB}
            dataKey={labelB}
            stroke="var(--color-secondary)"
            fill="var(--color-secondary)"
            fillOpacity={0.15}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Legend
            wrapperStyle={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}
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
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
