'use client';

import React, { useState } from 'react';
// Removed for performance reasons and because it doesn't compile
// import { AutoTokenizer } from '@huggingface/transformers';

const TokenVisualizer = ({ text, tokens }) => {
  const [hoveredToken, setHoveredToken] = useState(null);

  // Validate that tokens prop is provided
  if (!tokens) {
    throw new Error('TokenVisualizer: tokens prop is required');
  }

  // Validate tokens structure
  if (!Array.isArray(tokens)) {
    throw new Error('TokenVisualizer: tokens must be an array');
  }

  // Validate tokens; allow "plain" tokens without id when highlight is disabled
  tokens.forEach((token, index) => {
    if (!token || typeof token.text === 'undefined') {
      throw new Error(`TokenVisualizer: token at index ${index} must have text`);
    }
    const isPlain = token.highlight === false || token.plain === true || token.id == null;
    if (!isPlain && typeof token.id === 'undefined') {
      throw new Error(`TokenVisualizer: token at index ${index} must have id unless highlight is false/plain or id is null`);
    }
  });

  const getTokenColor = (tokenId, isHovered = false) => {
    // Seed constant for color generation
    const SEED = 0x9e3773b9;

    // Use a proper hash function for maximum color diversity
    let hash = tokenId ^ SEED;
    hash = ((hash >>> 16) ^ hash) * 0x45d9f3b;
    hash = ((hash >>> 16) ^ hash) * 0x45d9f3b;
    hash = (hash >>> 16) ^ hash;

    // Extract different parts of the hash for hue, saturation, and lightness
    const hue = Math.abs(hash) % 360;
    const saturation = 25 + (Math.abs(hash >>> 8) % 15); // 25-40% saturation for more muted colors
    const lightness = isHovered ? 88 : 82; // 40-50% lightness for better contrast

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
      <div className="token-visualizer" style={{
        backgroundColor: '#f6f8fa',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px',
        marginBottom: '20px',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: '14px',
        lineHeight: '1.6',
        position: 'relative',
        boxShadow: 'inset 0 0 0 1px #e5e7eb'  // ring-1 ring-inset dark:ring-neutral-700
      }}>
      <div style={{
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: '14px',
        lineHeight: '1.8',  // Slightly decreased from 2.0
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        color: '#24292f'
      }}>
        {tokens.map((token, index) => {
          const isHovered = hoveredToken === index;

          // Check if token is a special character like █
          const isSpecialChar = token.text === '█' || token.text === '▁' || token.text === '▂' || token.text === '▃' || token.text === '▄' || token.text === '▅' || token.text === '▆' || token.text === '▇';

          const skipHighlight = isSpecialChar || token.highlight === false || token.plain === true || token.id == null;
          const tokenColor = skipHighlight ? 'transparent' : getTokenColor(token.id, isHovered);

          // Display text with visible newline symbols
          const displayText = token.text;

          return (
            <span
              key={index}
              onMouseEnter={() => setHoveredToken(index)}
              onMouseLeave={() => setHoveredToken(null)}
              style={{
                backgroundColor: skipHighlight ? 'transparent' : tokenColor,
                color: isSpecialChar ? '#24292f' : 'inherit',
                cursor: skipHighlight ? 'default' : 'pointer',
                position: 'relative',
                transition: 'background-color 0.15s ease',
                padding: '1px 0',  // Reduced padding to minimize gaps
                margin: 0,  // Ensure no margins
                display: 'inline'  // Ensure inline display
              }}
            >
              {displayText}
              {isHovered && !skipHighlight && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  color: '#e2e8f0',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'normal',
                  whiteSpace: 'pre',
                  marginTop: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                  pointerEvents: 'none',
                  zIndex: 1000,
                  animation: 'fadeIn 0.1s ease-in'
                }}>
                  <div>Token: "{token.text.replace(/\n/g, '\\n')}"</div>
                  <div style={{ marginTop: '4px', color: '#a0aec0' }}>ID: {token.id}</div>
                </div>
              )}
            </span>
          );
        })}
      </div>

      <div style={{
        marginTop: '15px',
        color: '#6b7280',
        fontSize: '12px',
        textAlign: 'right'
      }}>
        Click or hover to highlight the tokens
      </div>
    </div>
    </>
  );
};

export default TokenVisualizer;