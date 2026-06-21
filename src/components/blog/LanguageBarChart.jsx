'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

export default function LanguageBarChart({ data, title = "Language Distribution" }) {
  // Language-specific color mapping
  const languageColors = {
    'Java': '#ED8B00',        // Java orange
    'Kotlin': '#7F52FF',      // Kotlin purple
    'Python': '#3776AB',      // Python blue
    'TypeScript': '#3178C6',  // TypeScript blue
    'Ruby': '#CC342D',        // Ruby red
    'PHP': '#777BB4',         // PHP purple
    'C#': '#239120',          // C# green
    'Go': '#00ADD8',          // Go cyan
    'Rust': '#CE422B',        // Rust orange-red
    'C++': '#00599C',         // C++ blue
    'TSX': '#61DAFB',         // React cyan (TSX is React)
    'JavaScript': '#F0DB4F'   // JavaScript yellow (slightly darker)
  };

  // Transform data for Recharts and add language-specific colors
  const chartData = data.map((item) => ({
    ...item,
    fill: languageColors[item.language] || '#6B7280' // fallback gray
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.97)',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          color: '#1f2937',
          backdropFilter: 'blur(8px)'
        }}>
          <p style={{ margin: 0, fontWeight: '600', marginBottom: '6px', fontSize: '0.95rem' }}>
            {data.language}
          </p>
          <p style={{ margin: 0, fontSize: '0.9rem', marginBottom: '2px' }}>
            <span style={{ color: data.fill, fontSize: '1.2em' }}>●</span> {data.percentage.toFixed(2)}%
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>
            {data.entries.toLocaleString()} entries
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label component for bars
  const CustomLabel = (props) => {
    const { x, y, width, height, value } = props;
    return (
      <g>
        {/* Background rectangle for better contrast */}
        <rect
          x={x + width / 2 - 20}
          y={y - 20}
          width="40"
          height="16"
          fill="rgba(255, 255, 255, 0.95)"
          stroke="rgba(0, 0, 0, 0.12)"
          strokeWidth="1"
          rx="3"
        />
        {/* White text for maximum contrast */}
        <text
          x={x + width / 2}
          y={y - 8}
          fill="#1f2937"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
        >
          {value.toFixed(1)}%
        </text>
      </g>
    );
  };

  return (
    <div style={{
      margin: '0.5rem 0',
      padding: '0.5rem',
      border: '1px solid var(--nextra-border)',
      borderRadius: '8px',
      backgroundColor: 'var(--nextra-bg)'
    }}>
      <h3 style={{
        marginBottom: '0.5rem',
        fontSize: '1.2rem',
        fontWeight: '600',
        color: 'var(--nextra-fg)',
        textAlign: 'center',
        margin: '0 0 0.5rem 0'
      }}>
        {title}
      </h3>

      <div style={{ width: '100%', height: '420px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 10,
              left: 10,
              bottom: 45
            }}
          >
            <defs>
              <style>
                {`
                  .recharts-bar-rectangle:hover {
                    filter: none !important;
                    opacity: 1 !important;
                  }
                  .recharts-active-bar {
                    filter: none !important;
                    opacity: 1 !important;
                  }
                `}
              </style>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1f2937"
              opacity={0.2}
            />
            <XAxis
              dataKey="language"
              angle={-45}
              textAnchor="end"
              height={70}
              interval={0}
              tick={{
                fontSize: 13,
                fill: '#1f2937',
                fontWeight: '600'
              }}
              axisLine={{
                stroke: '#1f2937',
                strokeWidth: 1
              }}
              tickLine={{
                stroke: '#1f2937',
                strokeWidth: 1
              }}
            />
            <YAxis
              tick={{
                fontSize: 12,
                fill: '#1f2937',
                fontWeight: '500'
              }}
              axisLine={{
                stroke: '#1f2937',
                strokeWidth: 1
              }}
              tickLine={{
                stroke: '#1f2937',
                strokeWidth: 1
              }}
              label={{
                value: 'Percentage (%)',
                angle: -90,
                position: 'insideLeft',
                style: {
                  textAnchor: 'middle',
                  fill: '#1f2937',
                  fontWeight: '600'
                }
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar
              dataKey="percentage"
              radius={[4, 4, 0, 0]}
              stroke="var(--nextra-border)"
              strokeWidth={1}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  style={{ filter: 'none' }}
                />
              ))}
              <LabelList content={<CustomLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}