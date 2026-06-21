import React from 'react';

// Lightweight, dependency-free code block. The previous version highlighted
// via shiki's async codeToHtml in the browser, which loaded a WASM engine and
// silently failed to populate. This renders synchronously (works in SSR and on
// the client) and colors diff +/- lines, which is what these comparisons need.
const CodeBlock = ({ code, lang = 'diff', style = {} }) => {
	const lines = String(code).replace(/\n+$/, '').split('\n');
	const isDiff = lang === 'diff';

	return (
		<pre
			style={{
				margin: 0,
				backgroundColor: '#0D1117',
				padding: '12px',
				borderRadius: '6px',
				overflow: 'auto',
				fontSize: '13px',
				lineHeight: 1.55,
				color: '#e6edf3',
				fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
				...style,
			}}
		>
			<code>
				{lines.map((line, i) => {
					let backgroundColor = 'transparent';
					let color = '#e6edf3';
					if (isDiff && line.startsWith('+')) {
						backgroundColor = 'rgba(46, 160, 67, 0.18)';
						color = '#7ee787';
					} else if (isDiff && line.startsWith('-')) {
						backgroundColor = 'rgba(248, 81, 73, 0.18)';
						color = '#ffa198';
					}
					return (
						<div
							key={i}
							style={{ display: 'block', whiteSpace: 'pre', backgroundColor, color }}
						>
							{line === '' ? ' ' : line}
						</div>
					);
				})}
			</code>
		</pre>
	);
};

export default CodeBlock;
