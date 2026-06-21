'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList, Legend } from 'recharts';

export default function PerformanceComparisonChart({
  beforeData = { ttft: 197.3, decoding: 2988.7, total: 3338.5 },
  afterData = { ttft: 185.6, decoding: 363.0, total: 623.9 },
  middleData = null,
  title = "Vanilla vs Speculative Decoding (P50)",
  beforeLabel = "Vanilla",
  afterLabel = "Spec Dec",
  middleLabel = null,
  beforeColor = "#ff6b6b",
  afterColor = "#51cf66",
  middleColor = "#0066cc"
}) {
  // Transform data for the chart
  const chartData = [
    {
      metric: 'TTFT',
      before: beforeData.ttft,
      middle: middleData?.ttft,
      after: afterData.ttft,
      speedup: (beforeData.ttft / afterData.ttft).toFixed(1)
    },
    {
      metric: 'Decoding',
      before: beforeData.decoding,
      middle: middleData?.decoding,
      after: afterData.decoding,
      speedup: (beforeData.decoding / afterData.decoding).toFixed(1)
    },
    {
      metric: 'Total',
      before: beforeData.total,
      middle: middleData?.total,
      after: afterData.total,
      speedup: (beforeData.total / afterData.total).toFixed(1)
    }
  ];

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
            {data.metric}
          </p>
          <p style={{ margin: 0, fontSize: '0.9rem', marginBottom: '2px' }}>
            <span style={{ color: beforeColor, fontSize: '1.2em' }}>●</span> {beforeLabel}: {data.before}ms
          </p>
          {middleData && (
            <p style={{ margin: 0, fontSize: '0.9rem', marginBottom: '2px' }}>
              <span style={{ color: middleColor, fontSize: '1.2em' }}>●</span> {middleLabel}: {data.middle}ms
            </p>
          )}
          <p style={{ margin: 0, fontSize: '0.9rem', marginBottom: '2px' }}>
            <span style={{ color: afterColor, fontSize: '1.2em' }}>●</span> {afterLabel}: {data.after}ms
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9, color: '#51cf66' }}>
            {data.speedup}x faster
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label component for raw values
  const ValueLabel = (props) => {
    const { x, y, width, height, value } = props;
    return (
      <g>
        {/* Background rectangle for better contrast */}
        <rect
          x={x + width / 2 - 30}
          y={y - 25}
          width="60"
          height="18"
          fill="rgba(255, 255, 255, 0.95)"
          stroke="rgba(0, 0, 0, 0.12)"
          strokeWidth="1"
          rx="3"
        />
        {/* White text for maximum contrast */}
        <text
          x={x + width / 2}
          y={y - 12}
          fill="#1f2937"
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
      margin: '20px 0',
      padding: '20px',
      border: '1px solid var(--nextra-border)',
      borderRadius: '8px',
      backgroundColor: 'var(--nextra-bg)'
    }}>
      <h4 style={{
        marginBottom: '20px',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#1f2937',
        textAlign: 'center',
        margin: '0 0 20px 0'
      }}>
        {title}
      </h4>

      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
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
              stroke="#1f2937"
              opacity={0.2}
            />
            <XAxis
              dataKey="metric"
              tick={{
                fontSize: 14,
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
                value: 'Latency (ms)',
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

            {/* Before bars */}
            <Bar
              dataKey="before"
              name={beforeLabel}
              fill={beforeColor}
              radius={[4, 4, 0, 0]}
              stroke="#1f2937"
              strokeWidth={1}
            >
              <LabelList content={<ValueLabel />} />
            </Bar>

            {/* Middle bars (only if middleData exists) */}
            {middleData && (
              <Bar
                dataKey="middle"
                name={middleLabel}
                fill={middleColor}
                radius={[4, 4, 0, 0]}
                stroke="#1f2937"
                strokeWidth={1}
              >
                <LabelList content={<ValueLabel />} />
              </Bar>
            )}

            {/* After bars */}
            <Bar
              dataKey="after"
              name={afterLabel}
              fill={afterColor}
              radius={[4, 4, 0, 0]}
              stroke="#1f2937"
              strokeWidth={1}
            >
              <LabelList content={<ValueLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        marginTop: '0px',
        marginBottom: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '16px',
            height: '16px',
            backgroundColor: beforeColor,
            borderRadius: '2px'
          }} />
          <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>
            {beforeLabel}
          </span>
        </div>
        {middleData && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              backgroundColor: middleColor,
              borderRadius: '2px'
            }} />
            <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>
              {middleLabel}
            </span>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '16px',
            height: '16px',
            backgroundColor: afterColor,
            borderRadius: '2px'
          }} />
          <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>
            {afterLabel}
          </span>
        </div>
      </div>

      <div style={{
        fontSize: '12px',
        color: '#1f2937',
        marginTop: '5px',
        textAlign: 'center',
        opacity: 0.8
      }}>
        <strong>Key Improvements:</strong> {parseFloat(chartData[0].speedup) >= 1.0 && `TTFT: ${chartData[0].speedup}x faster, `}
        Decoding: {chartData[1].speedup}x faster,
        Total: {chartData[2].speedup}x faster
      </div>
    </div>
  );
}