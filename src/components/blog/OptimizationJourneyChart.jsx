'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';

export default function OptimizationJourneyChart({
  data = [
    { step: 'Vanilla vLLM', total: 3338.5, color: '#ff6b6b' },
    { step: 'Spec Dec', total: 623.9, color: '#51cf66' },
    { step: 'H100', total: 226.7, color: '#0066cc' },
    { step: 'H100 + Opts', total: 187.3, color: '#00cc66' },
    { step: 'TRT-LLM FP8', total: 130.39, color: '#9900cc' },
    { step: 'Early Cancel', total: 94.49, color: '#00aa44' }
  ],
  title = "Next-Edit Autocomplete Latency (P50)"
}) {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const improvement = data.step !== 'Vanilla vLLM' ?
        (3338.5 / data.total).toFixed(1) : '1.0';

      return (
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(8px)'
        }}>
          <p style={{ margin: 0, fontWeight: '600', marginBottom: '6px', fontSize: '0.95rem' }}>
            {data.step}
          </p>
          <p style={{ margin: 0, fontSize: '0.9rem', marginBottom: '2px' }}>
            <span style={{ color: data.color, fontSize: '1.2em' }}>●</span> Total: {data.total}ms
          </p>
          {data.step !== 'Vanilla vLLM' && (
            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9, color: '#51cf66' }}>
              {improvement}x faster than baseline
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom label component for values
  const ValueLabel = (props) => {
    const { x, y, width, height, value } = props;
    return (
      <g>
        {/* Background rectangle for better contrast */}
        <rect
          x={x + width / 2 - 35}
          y={y - 25}
          width="70"
          height="18"
          fill="rgba(0, 0, 0, 0.8)"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1"
          rx="3"
        />
        {/* White text for maximum contrast */}
        <text
          x={x + width / 2}
          y={y - 12}
          fill="#ffffff"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
        >
          {Math.round(value)}ms
        </text>
      </g>
    );
  };

  return (
    <div style={{
      margin: '20px 0 0 0',
      padding: '20px 20px 0 20px',
      border: '1px solid var(--nextra-border)',
      borderRadius: '8px',
      backgroundColor: 'var(--nextra-bg)'
    }}>
      <h4 style={{
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
        margin: '0 0 20px 0'
      }}>
        {title}
      </h4>

      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 40,
              right: 30,
              left: 20,
              bottom: 20
            }}
            style={{
              backgroundColor: 'transparent'
            }}
          >
            <defs>
              <style>
                {`
                  .recharts-bar-rectangle:hover {
                    filter: brightness(1.1) !important;
                    opacity: 1 !important;
                  }
                  .recharts-active-bar {
                    filter: brightness(1.1) !important;
                    opacity: 1 !important;
                  }
                `}
              </style>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#ffffff"
              opacity={0.2}
            />
            <XAxis
              dataKey="step"
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tick={{
                fontSize: 12,
                fill: '#ffffff',
                fontWeight: '600'
              }}
              axisLine={{
                stroke: '#ffffff',
                strokeWidth: 1
              }}
              tickLine={{
                stroke: '#ffffff',
                strokeWidth: 1
              }}
            />
            <YAxis
              tick={{
                fontSize: 12,
                fill: '#ffffff',
                fontWeight: '500'
              }}
              axisLine={{
                stroke: '#ffffff',
                strokeWidth: 1
              }}
              tickLine={{
                stroke: '#ffffff',
                strokeWidth: 1
              }}
              label={{
                value: 'Total Latency (ms)',
                angle: -90,
                position: 'insideLeft',
                style: {
                  textAnchor: 'middle',
                  fill: '#ffffff',
                  fontWeight: '600'
                }
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />

            <Bar
              dataKey="total"
              radius={[4, 4, 0, 0]}
              stroke="#ffffff"
              strokeWidth={1}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList content={<ValueLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}