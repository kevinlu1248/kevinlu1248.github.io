'use client'

import React, { useState } from 'react'

export default function TokenHealingStateMachine() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      id: 0,
      description: '1. We need to respect the typed prefix "sw".',
      prefixRemaining: 'sw',
      generated: '',
      allowedTokens: 'The next token must start with "sw" ("swing") or be a prefix of "sw" ("s")',
      examples: 's, swing, switch',
      tokens: [],
      nextToken: 's'
    },
    {
      id: 1,
      description: '2. The model chose "s" (substring of "sw"). The remaining prefix is "w".',
      prefixRemaining: 'w',
      generated: 's',
      allowedTokens: 'The next token must start with "w"',
      examples: 'w, wap, weep, wing',
      tokens: ['s'],
      nextToken: 'weep'
    },
    {
      id: 2,
      description: '3. The model chose "weep" (starts with "w"). We are done!',
      prefixRemaining: '',
      generated: 'sweep',
      allowedTokens: 'We can now generate any token',
      examples: 'any token is eligible (no prefix)',
      tokens: ['s', 'weep'],
      nextToken: '...'
    },
  ]

  const currentStepData = steps[currentStep]

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div style={{
      backgroundColor: '#000000',
      borderRadius: '8px',
      padding: '24px',
      marginTop: '20px',
      marginBottom: '20px',
      boxShadow: 'inset 0 0 0 1px rgb(64 64 64)'  // Same border style as TokenVisualizer
    }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#e2e8f0' }}>
          Token Healing Example: "sw" to "sweep"
        </h4>
      </div>

      <div>
        {/*{currentStepData.description && (*/}
        {/*  <div style={{*/}
        {/*    color: '#e2e8f0',*/}
        {/*    fontSize: '15px',*/}
        {/*    marginBottom: '16px',*/}
        {/*    fontWeight: '400',*/}
        {/*    lineHeight: '1.6',*/}
        {/*    fontFamily: 'inherit'  // Use normal font, not monospace*/}
        {/*  }}>*/}
        {/*    {currentStepData.description}*/}
        {/*  </div>*/}
        {/*)}*/}

        <div style={{
          backgroundColor: currentStep >= 2 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(167, 139, 250, 0.15)',
          padding: '12px',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#e2e8f0'
        }}>
          <strong>Constraints:</strong> {currentStepData.allowedTokens}<br/>
          <span style={{ color: '#a0aec0' }}>
            Possible tokens: {currentStepData.examples.split(', ').map((token, index, arr) => {
              const cleanToken = token.replace(/"/g, '')
              const isSelected = currentStepData.nextToken &&
                (currentStepData.nextToken === cleanToken || `"${currentStepData.nextToken}"` === token)
              return (
                <React.Fragment key={index}>
                  {index > 0 && ', '}
                  {isSelected ? <strong>{token}</strong> : token}
                </React.Fragment>
              )
            })}
          </span>
        </div>

        {/* Visual flow diagram */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: 'rgba(64, 64, 64, 0.3)',
          borderRadius: '6px',
          fontSize: '13px',
          fontFamily: 'monospace'
        }}>
          {/* Current generation state */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ color: '#94a3b8' }}>Generated: </span>

            {/* Show empty space if no tokens yet */}
            {currentStepData.tokens.length === 0 && (
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#374151',
                color: 'transparent',
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                &nbsp;
              </span>
            )}

            {/* Show all accumulated tokens with + between them */}
            {currentStepData.tokens.map((token, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span style={{ color: '#64748b' }}>+</span>}
                <span style={{
                  padding: '4px 8px',
                  backgroundColor: '#374151',
                  color: '#10b981',
                  borderRadius: '4px'
                }}>
                  {token}
                </span>
              </React.Fragment>
            ))}

            {/* Show next token to be added */}
            {currentStepData.nextToken && (
              <>
                <span style={{ color: '#64748b' }}>+</span>
                <span style={{
                  padding: '4px 8px',
                  backgroundColor: '#374151',
                  color: currentStep === 2 ? '#94a3b8' : '#fbbf24',
                  borderRadius: '4px',
                  animation: 'pulse 1s',
                  border: currentStep === 2 ? 'none' : '1px dashed #fbbf24'
                }}>
                  {currentStepData.nextToken}
                </span>
              </>
            )}

            {currentStep >= 2 && (
              <span style={{
                color: '#10b981',
                marginLeft: '8px',
                fontWeight: 'bold'
              }}>
                ✓ Prefix constraint satisfied!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Control buttons at the bottom */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          style={{
            padding: '6px 12px',
            backgroundColor: currentStep === 0 ? '#d1d5db' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            opacity: currentStep === 0 ? 0.5 : 1
          }}
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          style={{
            padding: '6px 12px',
            backgroundColor: currentStep === steps.length - 1 ? '#d1d5db' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            opacity: currentStep === steps.length - 1 ? 0.5 : 1
          }}
        >
          Next Step →
        </button>
      </div>
    </div>
  )
}