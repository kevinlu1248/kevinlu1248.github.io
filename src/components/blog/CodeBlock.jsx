import React, { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

const CodeBlock = ({ code, lang = 'diff', theme = 'github-dark-default', style = {} }) => {
    const [highlightedHtml, setHighlightedHtml] = useState('');

    useEffect(() => {
        const highlight = async () => {
            try {
                const html = await codeToHtml(code, { lang, theme });
                setHighlightedHtml(html);
            } catch (error) {
                console.error('Error highlighting code:', error);
                // Fallback to plain text
                setHighlightedHtml(`<pre><code>${code}</code></pre>`);
            }
        };

        highlight();
    }, [code, lang, theme]);

    return (
        <div
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            style={{
                margin: 0,
                backgroundColor: '#0D1117',
                padding: '12px',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '13px',
                ...style
            }}
        />
    );
};

export default CodeBlock;
