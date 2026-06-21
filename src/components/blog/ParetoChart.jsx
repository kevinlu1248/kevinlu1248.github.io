'use client'

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, ReferenceLine, Line } from 'recharts';

export default function ParetoChart() {
  const baselineQuality = 65.37; // Qwen2.5 7B Coder Instruct baseline

  // Sweep data points for Pareto frontier
  const sweepPoints = [
    { tps: 1090.05, quality: 67.97 }, // Sweep 0.5B
    { tps: 901.26, quality: 75.00 },  // Sweep 1.5B
    { tps: 693.88, quality: 80.73 },  // Sweep 3B
    { tps: 525.03, quality: 88.02 }   // Sweep 7B
  ];

  const data = [
    {
      name: 'Qwen3-0.6B',
      tps: 1059.19,
      quality: 21.09,
      color: '#9CA3AF',
      group: 'qwen'
    },
    {
      name: 'Qwen3-1.7B',
      tps: 787.79,
      quality: 32.81,
      color: '#9CA3AF',
      group: 'qwen'
    },
    {
      name: 'Qwen3-4B',
      tps: 646.79,
      quality: 46.61,
      color: '#9CA3AF',
      group: 'qwen'
    },
    {
      name: 'Qwen3-8B',
      tps: 478.46,
      quality: 57.82,
      color: '#9CA3AF',
      group: 'qwen'
    },
    {
      name: 'Zed - Zeta',
      tps: 525.03,
      quality: 64.84,
      color: '#1E3A8A',
      group: 'zed'
    },
    {
      name: 'Continue - Instinct',
      tps: 525.03,
      quality: 27.61,
      color: '#FA8072',
      group: 'instinct'
    },
    {
      name: 'Inception - Mercury Coder',
      tps: 79.86,
      quality: 66.15,
      color: '#87CEEB',
      group: 'mercury'
    },
    {
      name: 'Sweep 0.5B',
      tps: 1090.05,
      quality: 67.97,
      color: '#a78bfa',
      group: 'sweep'
    },
    {
      name: 'Sweep 1.5B',
      tps: 901.26,
      quality: 75.00,
      color: '#a78bfa',
      group: 'sweep'
    },
    {
      name: 'Sweep 3B',
      tps: 693.88,
      quality: 80.73,
      color: '#a78bfa',
      group: 'sweep'
    },
    {
      name: 'Sweep 7B',
      tps: 525.03,
      quality: 88.02,
      color: '#a78bfa',
      group: 'sweep'
    }
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
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
            {data.name}
          </p>
          <p style={{ margin: 0, fontSize: '0.9rem', marginBottom: '2px' }}>
            Speed: {data.tps.toFixed(2)}
          </p>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            Quality: {data.quality.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      paddingTop: 24,
      border: '1px solid var(--nextra-border)',
      borderRadius: '8px',
      backgroundColor: 'var(--nextra-bg)'
    }}>
      <h4 style={{
        marginBottom: '20px',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
        margin: '0 0 20px 0'
      }}>
        Next Edit Models: Speed vs Quality
      </h4>

      <div style={{ height: '500px', margin: '0 auto' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 40,
              right: 30,
              left: 20,
              bottom: 60
            }}
          >
            <defs>
              <style>
                {`
                  .recharts-scatter-symbol:hover {
                    filter: brightness(1.2) !important;
                    opacity: 1 !important;
                  }
                `}
              </style>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#ffffff"
              opacity={0}
            />
            <XAxis
              type="number"
              dataKey="tps"
              name="Speed (tokens/second)"
              unit=""
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
              domain={[0, 1200]}
              ticks={[0, 200, 400, 600, 800, 1000, 1200]}
            >
              <Label
                value="Speed (tokens/second)"
                position="bottom"
                offset={18}
                style={{
                  textAnchor: 'middle',
                  fill: '#ffffff',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="quality"
              name="Quality"
              unit="%"
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
              domain={[0, 100]}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            >
              <Label
                value="Quality (%)"
                angle={-90}
                position="insideLeft"
                style={{
                  textAnchor: 'middle',
                  fill: '#ffffff',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />

            {/* Baseline reference line */}
            <ReferenceLine
              y={baselineQuality}
              stroke="#9CA3AF"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={(props) => {
                const { viewBox } = props;
                const x = viewBox.x + viewBox.width - 10; // Position at far right
                const y = viewBox.y + 20; // Shift down by 20px total
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#9CA3AF"
                    fontSize={11}
                    fontWeight={500}
                    textAnchor="end"
                  >
                    Baseline
                  </text>
                );
              }}
            />

            {/* Pareto Optimal region - shaded triangle in top-right corner */}
            <defs>
              <linearGradient id="paretoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#a78bfa', stopOpacity: 0.05 }} />
                <stop offset="50%" style={{ stopColor: '#a78bfa', stopOpacity: 0.15 }} />
                <stop offset="100%" style={{ stopColor: '#a78bfa', stopOpacity: 0.35 }} />
              </linearGradient>
              <pattern id="paretoPattern" patternUnits="userSpaceOnUse" width="4" height="4">
                <rect width="4" height="4" fill="url(#paretoGradient)" />
                <path d="M 0,4 l 4,-4 M -1,1 l 2,-2 M 3,5 l 2,-2" stroke="#a78bfa" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>

            {/* Custom shape to create the Pareto optimal region */}
            {/* Using a reference area-like approach with custom rendering */}
            <g>
              <rect
                x="20%"
                y="8%"
                width="75%"
                height="32%"
                fill="url(#paretoGradient)"
                stroke="#a78bfa"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.7"
                style={{
                  clipPath: 'polygon(100% 0%, 100% 100%, 0% 0%)'
                }}
              />
              <text
                x="85%"
                y="5%"
                fill="#a78bfa"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
              >
                Pareto Optimal
              </text>
            </g>

            {/* Single scatter plot with all data points */}
            <Scatter
              data={data}
              fill="#8884d8"
              shape={(props) => {
                const { cx, cy, payload } = props;

                // Map groups to logo paths
                const logoMap = {
                  'sweep': '/favicons/logo.png',
                  'zed': '/sweep-next-edit/zed.png',
                  'qwen': '/sweep-next-edit/qwen.png',
                  'instinct': '/sweep-next-edit/continue.png',
                  'mercury': '/sweep-next-edit/inception.png'
                };

                const logoSrc = logoMap[payload.group];
                const size = 24;

                return (
                  <g>
                    <foreignObject
                      x={cx - size / 2}
                      y={cy - size / 2}
                      width={size}
                      height={size}
                    >
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: `2px solid ${payload.color}`
                      }}>
                        <img
                          src={logoSrc}
                          alt={payload.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    </foreignObject>
                  </g>
                );
              }}
              label={(props) => {
                const { x, y, index } = props;
                const dataPoint = data[index];
                if (!dataPoint) return null;

                const isSweep = dataPoint.group === 'sweep';

                return (
                  <g>
                    {/* Background for better readability */}
                    <text
                      x={x + 18}
                      y={y - 1}
                      fill={isSweep ? '#a78bfa' : '#ffffff'}
                      textAnchor="start"
                      fontSize="9"
                      fontWeight={isSweep ? '600' : '500'}
                    >
                      {dataPoint.name}
                    </text>
                  </g>
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
