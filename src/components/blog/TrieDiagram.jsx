import React, { useEffect, useMemo, useRef, useState } from 'react';

const TrieDiagram = ({ words = ["cat", "car", "card", "care", "careful"] }) => {
    const [highlightedPath, setHighlightedPath] = useState("card");
    const [selectedWord, setSelectedWord] = useState("card");
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(800); // sensible default for SSR

    // Observe container size for responsive layout
    useEffect(() => {
        if (!containerRef.current) return;
        const el = containerRef.current;
        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const cw = entry.contentRect?.width || el.clientWidth || 800;
                setContainerWidth(Math.max(280, cw));
            }
        });
        ro.observe(el);
        // initialize once
        setContainerWidth(el.clientWidth || 800);
        return () => ro.disconnect();
    }, []);

    // Build trie structure for visualization
    const buildTrie = (words) => {
        const root = {char: 'root', children: {}, isEnd: false, words: []};

        words.forEach(word => {
            let current = root;
            for (let i = 0; i < word.length; i++) {
                const char = word[i];
                if (!current.children[char]) {
                    current.children[char] = {
                        char,
                        children: {},
                        isEnd: false,
                        words: [],
                        path: word.substring(0, i + 1)
                    };
                }
                current = current.children[char];
                current.words.push(word);
            }
            current.isEnd = true;
            current.completeWord = word;
        });

        return root;
    };

    const trie = useMemo(() => buildTrie(words), [words]);

    // Helpers to compute depth of the trie for height calculation
    const getDepth = (node) => {
        if (!node || !node.children) return 1;
        const childDepths = Object.values(node.children).map(getDepth);
        return 1 + (childDepths.length ? Math.max(...childDepths) : 0);
    };

    // Calculate positions for nodes (responsive to containerWidth)
    const positions = useMemo(() => {
        const width = containerWidth || 800;
        const isMobile = width < 520;
        const depth = getDepth(trie);
        const spacingY = isMobile ? 64 : 80;
        const rootX = Math.max(140, width / 2);
        const rootY = isMobile ? 32 : 50;

        const calc = (node, x = rootX, y = rootY, level = 0) => {
            const pos = [];
            const children = Object.values(node.children);
            // Horizontal spacing reduces as depth increases, but respects minimums
            const base = Math.max(isMobile ? 72 : 100, (width * 0.8) / Math.pow(2, level + 1));

            pos.push({
                ...node,
                x,
                y,
                level,
            });

            children.forEach((child, index) => {
                const childX = x + (index - (children.length - 1) / 2) * base;
                const childY = y + spacingY;
                pos.push(...calc(child, childX, childY, level + 1));
            });

            return pos;
        };

        return calc(trie);
    }, [containerWidth, trie]);

    // Get connections between nodes
    const connections = useMemo(() => {
        const connections = [];
        positions.forEach(pos => {
            Object.values(pos.children).forEach(child => {
                const childPos = positions.find(p => p.char === child.char && p.path === child.path);
                if (childPos) {
                    connections.push({
                        from: { x: pos.x, y: pos.y },
                        to: { x: childPos.x, y: childPos.y }
                    });
                }
            });
        });
        return connections;
    }, [positions]);

    const handleNodeClick = (node) => {
        if (node.completeWord) {
            setSelectedWord(node.completeWord);
            setHighlightedPath(node.completeWord);
        } else {
            setSelectedWord(null);
            setHighlightedPath(node.path || null);
        }
    };

    const isNodeHighlighted = (node) => {
        if (!highlightedPath) return false;
        return highlightedPath.startsWith(node.path || '') || node.char === 'root';
    };

    const isConnectionHighlighted = (connection) => {
        if (!highlightedPath) return false;
        const fromNode = positions.find(p => p.x === connection.from.x && p.y === connection.from.y);
        const toNode = positions.find(p => p.x === connection.to.x && p.y === connection.to.y);
        return isNodeHighlighted(fromNode) && isNodeHighlighted(toNode);
    };

    // Derived visual constants
    const isMobile = (containerWidth || 800) < 520;
    const nodeRadius = isMobile ? 16 : 20;
    const padding = isMobile ? 12 : 16;

    // Compute content bounds and offsets to keep everything visible and scrollable if needed
    const bounds = useMemo(() => {
        if (!positions.length) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
        const xs = positions.map(p => p.x);
        const ys = positions.map(p => p.y);
        return {
            minX: Math.min(...xs),
            maxX: Math.max(...xs),
            minY: Math.min(...ys),
            maxY: Math.max(...ys),
        };
    }, [positions]);

    const rawContentWidth = Math.ceil(
        bounds.maxX - bounds.minX + 2 * (nodeRadius + padding)
    );
    const canvasWidth = Math.max(containerWidth, rawContentWidth);
    const contentHeight = Math.ceil(bounds.maxY - bounds.minY + 2 * (nodeRadius + padding));
    // Center horizontally on desktop (and when there is extra space)
    const offsetX = Math.floor(
        (canvasWidth - rawContentWidth) / 2 + (padding + nodeRadius) - bounds.minX
    );
    const offsetY = Math.floor(padding + nodeRadius - bounds.minY);
    // On mobile, shift the diagram slightly left to reduce overlap with the words panel
    const offsetXAdjusted = isMobile ? offsetX - 24 : offsetX;

    return (
        <div
            ref={containerRef}
            className="trie-diagram"
            style={{
                width: '100%',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                position: 'relative',
                overflow: 'auto',
                color: '#24292f',
                marginTop: '24px',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-x pan-y'
            }}
        >
            {/* Inner canvas that can expand beyond container for scroll */}
            <div
                style={{
                    position: 'relative',
                    width: `${canvasWidth}px`,
                    height: `${contentHeight}px`,
                }}
            >
                <svg width={canvasWidth} height={contentHeight} style={{ position: 'absolute', top: 0, left: 0 }}>
                    {/* Render connections */}
                    {connections.map((conn, index) => (
                        <line
                            key={index}
                            x1={conn.from.x + offsetXAdjusted}
                            y1={conn.from.y + offsetY + nodeRadius}
                            x2={conn.to.x + offsetXAdjusted}
                            y2={conn.to.y + offsetY - nodeRadius}
                            stroke={isConnectionHighlighted(conn) ? '#7c3aed' : '#6b7280'}
                            strokeWidth={isConnectionHighlighted(conn) ? 3 : 2}
                            style={{ transition: 'all 0.3s ease' }}
                        />
                    ))}
                </svg>

                {/* Render nodes */}
                {positions.map((node, index) => (
                    <div
                        key={index}
                        onClick={() => handleNodeClick(node)}
                        style={{
                            position: 'absolute',
                            left: node.x + offsetXAdjusted - nodeRadius,
                            top: node.y + offsetY - nodeRadius,
                            width: `${nodeRadius * 2}px`,
                            height: `${nodeRadius * 2}px`,
                            borderRadius: '50%',
                            backgroundColor: isNodeHighlighted(node) ? '#7c3aed' : '#e5e7eb',
                            border: node.isEnd ? '3px solid #10b981' : '2px solid #6b7280',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: isMobile ? '12px' : '14px',
                            fontWeight: 'bold',
                            color: isNodeHighlighted(node) ? 'white' : '#24292f',
                            transition: 'all 0.3s ease',
                            boxShadow: isNodeHighlighted(node) ? '0 4px 12px rgba(167, 139, 250, 0.4)' : '0 2px 4px rgba(0,0,0,0.1)',
                            transform: isNodeHighlighted(node) ? 'scale(1.1)' : 'scale(1)',
                            zIndex: 10,
                            userSelect: 'none'
                        }}
                        title={node.isEnd ? `Complete word: ${node.completeWord}` : `Prefix: ${node.path || 'root'}`}
                    >
                        {node.char === 'root' ? '●' : node.char}
                    </div>
                ))}
            </div>

            {/* Word list */}
            <div
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: isMobile ? '18px' : '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.96)',
                    padding: isMobile ? '8px' : '12px',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                    fontSize: isMobile ? '11px' : '12px',
                    color: '#24292f',
                    maxHeight: isMobile ? '55%' : 'none',
                    overflowY: 'auto'
                }}
            >
                <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>
                    Words in Trie:
                </div>
                {words.map((word) => (
                    <div
                        key={word}
                        onClick={() => {
                            setSelectedWord(word);
                            setHighlightedPath(word);
                        }}
                        style={{
                            cursor: 'pointer',
                            padding: '2px 4px',
                            borderRadius: '3px',
                            backgroundColor: selectedWord === word ? '#7c3aed' : 'transparent',
                            color: selectedWord === word ? 'white' : 'inherit',
                            marginBottom: '2px'
                        }}
                    >
                        {word}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrieDiagram;