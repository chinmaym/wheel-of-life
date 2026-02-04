import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { CATEGORIES } from '../lib/categories'

export default function WheelChart({ scores, size = 300, showLabels = true }) {
  const data = CATEGORIES.map((cat) => ({
    category: showLabels ? cat.label : cat.emoji,
    score: scores[cat.key] ?? 0,
    fullMark: 10,
  }))

  return (
    <div className="flex justify-center">
      <ResponsiveContainer width="100%" height={size}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fontSize: showLabels ? 11 : 16, fill: '#64748b' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickCount={6}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#667eea"
            fill="#667eea"
            fillOpacity={0.25}
            strokeWidth={2}
            animationDuration={800}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '13px',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
