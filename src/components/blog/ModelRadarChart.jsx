'use client'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Global constants
const CATEGORIES = [
  { display: 'Below', key: 'Next Edit Down' },      // partial
  { display: 'Above', key: 'Next Edit Up' },        // partial_reverse
  { display: 'Tab to Jump', key: 'Tab to Jump' },   // full
  { display: 'FIM', key: 'FIM' },                   // fim
  { display: 'Noise', key: 'Noise' }                // noop
];

// Model data with scores for each category
// showInRadar flag controls whether model appears in radar chart
// All models appear in the table
const MODEL_DATA = [
    // Qwen models grouped together
    {
      name: 'Qwen3-1.7B',
      'Next Edit Down': 14.06,
      'Tab to Jump': 14.06,
      'Noise': 68.75,
      'Next Edit Up': 14.29,
      'FIM': 15.62,
      overall: 17.54,
      color: '#A0A0A0',
      showInRadar: false
    },
    {
      name: 'Qwen3-4B',
      'Next Edit Down': 24.22,
      'Tab to Jump': 33.59,
      'Noise': 90.62,
      'Next Edit Up': 16.33,
      'FIM': 25.00,
      overall: 30.19,
      color: '#909090',
      showInRadar: false
    },
    {
      name: 'Qwen3-8B',
      'Next Edit Down': 34.38,
      'Tab to Jump': 54.69,
      'Noise': 96.88,
      'Next Edit Up': 22.45,
      'FIM': 42.19,
      overall: 48.27,
      color: '#6B7280',
      showInRadar: true
    },
    {
      name: 'Qwen2.5-Coder-7B',
      'Next Edit Down': 54.69,
      'Tab to Jump': 56.25,
      'Noise': 100.00,
      'Next Edit Up': 61.22,
      'FIM': 41.41,
      overall: 55.62,
      color: '#4B5563',
      showInRadar: true
    },
    // Other models
    {
      name: 'Continue Instinct',
      'Next Edit Down': 10.94,
      'Tab to Jump': 23.44,
      'Noise': 34.38,
      'Next Edit Up': 8.16,
      'FIM': 37.50,
      overall: 25.30,
      color: '#FA8072',
      showInRadar: true
    },
    {
      name: 'Zed Zeta',
      'Next Edit Down': 67.19,
      'Tab to Jump': 62.50,
      'Noise': 87.50,
      'Next Edit Up': 69.39,
      'FIM': 35.94,
      overall: 43.27,
      color: '#1E3A8A',
      showInRadar: true
    },
    {
      name: 'Mercury Coder',
      'Next Edit Down': 71.88,
      'Tab to Jump': 70.31,
      'Noise': 62.50,
      'Next Edit Up': 53.06,
      'FIM': 64.06,
      overall: 54.09,
      color: '#87CEEB',
      showInRadar: true
    },
    // Sweep models
    {
      name: 'Sweep 0.5B',
      'Next Edit Down': 63.28,
      'Tab to Jump': 66.41,
      'Noise': 96.88,
      'Next Edit Up': 53.06,
      'FIM': 43.75,
      overall: 61.30,
      color: '#c4b5fd',
      showInRadar: false
    },
    {
      name: 'Sweep 1.5B',
      'Next Edit Down': 71.88,
      'Tab to Jump': 74.22,
      'Noise': 96.88,
      'Next Edit Up': 46.94,
      'FIM': 56.25,
      overall: 67.82,
      color: '#a78bfa',
      showInRadar: false
    },
    {
      name: 'Sweep 3B',
      'Next Edit Down': 82.03,
      'Tab to Jump': 82.03,
      'Noise': 100.00,
      'Next Edit Up': 57.14,
      'FIM': 60.16,
      overall: 72.12,
      color: '#8b5cf6',
      showInRadar: false
    },
    {
      name: 'Sweep 7B',
      'Next Edit Down': 89.84,
      'Tab to Jump': 82.03,
      'Noise': 100.00,
      'Next Edit Up': 75.51,
      'FIM': 74.22,
      overall: 81.28,
      color: '#6d28d9',
      showInRadar: true
    }
];

// Model Performance Table Component
export function ModelPerformanceTable() {
  // Group and sort models for table display
  const sweepModels = MODEL_DATA.filter(m => m.name.includes('Sweep')).sort((a, b) => b.overall - a.overall);
  const qwenModels = MODEL_DATA.filter(m => m.name.includes('Qwen')).sort((a, b) => b.overall - a.overall);
  const otherModels = MODEL_DATA.filter(m => !m.name.includes('Sweep') && !m.name.includes('Qwen')).sort((a, b) => b.overall - a.overall);

  // Combine groups for table display (Sweep models first, then Qwen models, then others)
  const sortedData = [...sweepModels, ...otherModels, ...qwenModels];

  return (
    <div style={{ marginTop: '30px', border: "1px solid #374151", borderRadius: "4px" }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.9rem',
          overflow: 'hidden'
        }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #374151' }}>
              <th style={{ padding: '10px', textAlign: 'left', color: '#ffffff' }}>Model</th>
              <th style={{ padding: '10px', textAlign: 'center', color: '#ffffff' }}>Below</th>
              <th style={{ padding: '10px', textAlign: 'center', color: '#ffffff' }}>Above</th>
              <th style={{ padding: '10px', textAlign: 'center', color: '#ffffff' }}>Tab to Jump</th>
              <th style={{ padding: '10px', textAlign: 'center', color: '#ffffff' }}>FIM</th>
              <th style={{ padding: '10px', textAlign: 'center', color: '#ffffff' }}>Noise</th>
              <th style={{ padding: '10px', textAlign: 'center', color: '#ffffff', fontWeight: 'bold' }}>Overall</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((model, index) => (
              <tr key={model.name} style={{
                borderBottom: '1px solid #1F2937',
                backgroundColor: model.name.includes('Qwen') ? 'rgba(107, 114, 128, 0.1)' :
                                 (index < 4 && model.name.includes('Sweep') ? 'rgba(167, 139, 250, 0.05)' : 'transparent')
              }}>
                <td style={{
                  padding: '10px',
                  color: model.color,
                  fontWeight: model.name.includes('Sweep') ? '600' : '400'
                }}>
                  {model.name}
                </td>
                <td style={{ padding: '10px', textAlign: 'center', color: '#D1D5DB' }}>
                  {model['Next Edit Down'].toFixed(2)}%
                </td>
                <td style={{ padding: '10px', textAlign: 'center', color: '#D1D5DB' }}>
                  {model['Next Edit Up'].toFixed(2)}%
                </td>
                <td style={{ padding: '10px', textAlign: 'center', color: '#D1D5DB' }}>
                  {model['Tab to Jump'].toFixed(2)}%
                </td>
                <td style={{ padding: '10px', textAlign: 'center', color: '#D1D5DB' }}>
                  {model['FIM'].toFixed(2)}%
                </td>
                <td style={{ padding: '10px', textAlign: 'center', color: '#D1D5DB' }}>
                  {model['Noise'].toFixed(2)}%
                </td>
                <td style={{
                  padding: '10px',
                  textAlign: 'center',
                  color: model.name.includes('Sweep') ? '#a78bfa' : '#ffffff',
                  fontWeight: 'bold'
                }}>
                  {model.overall.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main Radar Chart Component
export default function ModelRadarChart() {
  // Filter models for radar chart based on showInRadar flag
  const radarModels = MODEL_DATA.filter(model => model.showInRadar).sort((a, b) => b.overall - a.overall);

  // Use filtered models for radar chart
  const topModels = radarModels;

  // Format data for radar chart
  const data = CATEGORIES.map(cat => {
    const point = { category: cat.display };
    topModels.forEach(model => {
      point[model.name] = model[cat.key];
    });
    return point;
  });

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
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
          <p style={{ margin: 0, fontWeight: '600', marginBottom: '8px', fontSize: '0.95rem' }}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{
              margin: '4px 0',
              fontSize: '0.9rem',
              color: entry.color
            }}>
              {entry.name}: {entry.value.toFixed(2)}%
            </p>
          ))}
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
      <h3 style={{
        marginBottom: '10px',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        Accuracy by Task Category
      </h3>
      <div style={{ width: '100%', height: '500px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <defs>
              {topModels.map((model, index) => (
                <linearGradient key={model.name} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={model.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={model.color} stopOpacity={0.2}/>
                </linearGradient>
              ))}
            </defs>

            <PolarGrid
              gridType="polygon"
              radialLines={true}
              stroke="#374151"
              strokeWidth={1}
            />

            <PolarAngleAxis
              dataKey="category"
              tick={{
                fill: '#ffffff',
                fontSize: 12,
                fontWeight: 500,
                style: { zIndex: 1000 }
              }}
              style={{
                textAnchor: 'middle',
                zIndex: 1000
              }}
            />

            <PolarRadiusAxis
              domain={[0, 100]}
              ticks={[100]}
              tick={{
                fill: 'transparent',
                fontSize: 0
              }}
              axisLine={false}
            />

            {/* Render radars for top models */}
            {topModels.map((model, index) => (
              <Radar
                key={model.name}
                name={model.name}
                dataKey={model.name}
                stroke={model.color}
                fill={model.color}
                fillOpacity={0.15}
                strokeWidth={index < 3 ? 2.5 : 1.5}
                strokeOpacity={index < 3 ? 1 : 0.7}
              />
            ))}

            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}