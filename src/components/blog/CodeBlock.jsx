import React from 'react';

// Lightweight, dependency-free code block (light theme). Renders synchronously
// (works in SSR and on the client) and colors diff +/- lines.
const CodeBlock = ({ code, lang = 'diff', style = {} }) => {
	const lines = String(code).replace(/\n+$/, '').split('\n');
	const isDiff = lang === 'diff';

	return (
		<pre
			style={{
				margin: 0,
				backgroundColor: '#f6f8fa',
				border: '1px solid #e5e7eb',
				padding: '12px',
				borderRadius: '6px',
				overflow: 'auto',
				fontSize: '13px',
				lineHeight: 1.55,
				color: '#24292f',
				fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
				...style,
			}}
		>
			<code>
				{lines.map((line, i) => {
					let backgroundColor = 'transparent';
					let color = '#24292f';
					if (isDiff && line.startsWith('+')) {
						backgroundColor = '#e6ffec';
						color = '#1a7f37';
					} else if (isDiff && line.startsWith('-')) {
						backgroundColor = '#ffebe9';
						color = '#cf222e';
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
