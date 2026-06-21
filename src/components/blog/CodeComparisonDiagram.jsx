import React, { useState } from 'react';
import CodeBlock from './CodeBlock';

const CodeComparisonDiagram = () => {
    const [isCurrentWindowExpanded, setIsCurrentWindowExpanded] = useState(false);

    return (
        <div style={{
            width: '100%',
            border: '1px solid #374151',
            borderRadius: '8px',
            backgroundColor: 'rgba(17, 24, 39, 0.3)',
            color: '#f9fafb',
            marginTop: '24px',
            marginBottom: '24px',
            overflow: 'hidden'
        }}>
            {/* Recent Changes Section */}
            <div style={{
                padding: '20px',
                paddingBottom: '0',
                backgroundColor: 'rgba(17, 24, 39, 0.5)'
            }}>
                <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#a78bfa',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    Recent Changes
                </div>

                <div style={{
                    fontSize: '13px',
                    color: '#9ca3af',
                    marginBottom: '16px',
                    fontStyle: 'italic'
                }}>
                    (... more similar changes)
                </div>

                {/* Hunk 5 */}
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#60a5fa', marginBottom: '8px', fontSize: '11px', fontFamily: 'monospace' }}>
                        redisson-spring-data-18/...RedisClusterNodeDecoder.java:57-53
                    </div>
                    <CodeBlock
                        code={`            for (String flag : flagsStr.split(",")) {
-                String flagValue = flag.toUpperCase().replaceAll("\\?", "");
+                String flagValue = flag.toUpperCase(Locale.ENGLISH).replaceAll("\\?", "");
                flags.add(Flag.valueOf(flagValue));`}
                        lang="diff"
                    />
                </div>

                {/* Hunk 6 */}
                <div>
                    <div style={{ color: '#60a5fa', marginBottom: '8px', fontSize: '11px', fontFamily: 'monospace' }}>
                        redisson-spring-data-18/...RedisClusterNodeDecoder.java:75-71
                    </div>
                    <CodeBlock
                        code={`            if (params.length >= 8 && params[7] != null) {
-                linkState = LinkState.valueOf(params[7].toUpperCase());
+                linkState = LinkState.valueOf(params[7].toUpperCase(Locale.ENGLISH));
            }`}
                        lang="diff"
                    />
                </div>
            </div>

            {/* Current Span to Edit Section */}
            <div style={{
                padding: '20px',
                borderBottom: '2px solid #374151',
                backgroundColor: 'rgba(17, 24, 39, 0.4)'
            }}>
                <div
                    style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#60a5fa',
                        marginBottom: isCurrentWindowExpanded ? '8px' : '0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        userSelect: 'none'
                    }}
                    onClick={() => setIsCurrentWindowExpanded(!isCurrentWindowExpanded)}
                >
                    <span style={{
                        fontSize: '12px',
                        transition: 'transform 0.2s',
                        transform: isCurrentWindowExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        display: 'inline-block'
                    }}>▶</span>
                    <span>Current Span to Edit</span>
                </div>
                {isCurrentWindowExpanded && (
                    <>
                        <div style={{
                            color: '#60a5fa',
                            marginBottom: '12px',
                            fontSize: '11px',
                            fontFamily: 'monospace'
                        }}>
                            File: redisson-spring-data/redisson-spring-data-27/src/main/java/org/redisson/spring/data/connection/RedisClusterNodeDecoder.java
                        </div>
                        <CodeBlock
                            code={`String response = buf.toString(CharsetUtil.UTF_8);

List<RedisClusterNode> nodes = new ArrayList<RedisClusterNode>();
for (String nodeInfo : response.split("\\n")) {
    String[] params = nodeInfo.split(" ");

    String nodeId = params[0];

    String flagsStr = params[2];
    Set<Flag> flags = EnumSet.noneOf(Flag.class);
    for (String flag : flagsStr.split(",")) {
        String flagValue = flag.toUpperCase().replaceAll("\\\\?", "");
        flags.add(Flag.valueOf(flagValue));
    }

    RedisURI address = null;
    if (!flags.contains(Flag.NOADDR)) {
        String addr = params[1].split("@")[0];
        address = new RedisURI(RedisURI.REDIS_PROTOCOL + addr);
    }`}
                            lang="java"
                        />
                    </>
                )}
            </div>

            {/* Three Examples Stacked Vertically */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/* Example 1: continuedev/instinct */}
                <div style={{
                    border: '1px solid #374151',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#9ca3af',
                        padding: '16px 20px 12px 20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <span>continuedev/instinct</span>
                        <span style={{
                            color: '#fca5a5',
                            fontSize: '11px',
                            backgroundColor: 'rgba(239, 68, 68, 0.15)',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            textTransform: 'none',
                            fontWeight: '500'
                        }}>✗ Missing changes</span>
                    </div>
                    <div style={{
                        padding: '20px',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{
                            padding: '12px',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            fontFamily: 'monospace',
                            fontSize: '13px',
                            color: '#9ca3af',
                            fontStyle: 'italic',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            (No changes made)
                        </div>
                    </div>
                </div>

                {/* Example 2: zed-industries/zeta */}
                <div style={{
                    border: '1px solid #374151',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#f59e0b',
                        padding: '16px 20px 12px 20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <span>zed-industries/zeta</span>
                        <span style={{
                            color: '#fca5a5',
                            fontSize: '11px',
                            backgroundColor: 'rgba(239, 68, 68, 0.15)',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            textTransform: 'none',
                            fontWeight: '500'
                        }}>✗ Extra irrelevant changes</span>
                    </div>
                    <CodeBlock
                        code={`        String response = buf.toString(CharsetUtil.UTF_8);

-        List<RedisClusterNode> nodes = new ArrayList<RedisClusterNode>();
+        List<RedisClusterNode> nodes = new ArrayList<>();

...
            for (String flag : flagsStr.split(",")) {
-                String flagValue = flag.toUpperCase().replaceAll("\\\\?", "");
+                String flagValue = flag.toUpperCase(Locale.ENGLISH).replaceAll("\\\\?", "");

...
                address = new RedisURI(RedisURI.REDIS_PROTOCOL + addr);
-            }`}
                        lang="diff"
                        style={{ borderRadius: 0 }}
                    />
                </div>

                {/* Example 3: Sweep 7B */}
                <div style={{
                    border: '1px solid #374151',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#a78bfa',
                        padding: '16px 20px 12px 20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <span>sweepai/sweep-next-edit-7B</span>
                        <span style={{
                            color: '#6ee7b7',
                            fontSize: '11px',
                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            textTransform: 'none',
                            fontWeight: '500'
                        }}>✓ Precise, relevant change only</span>
                    </div>
                    <CodeBlock
                        code={`            for (String flag : flagsStr.split(",")) {
-                String flagValue = flag.toUpperCase().replaceAll("\\\\?", "");
+                String flagValue = flag.toUpperCase(Locale.ENGLISH).replaceAll("\\\\?", "");

`}
                        lang="diff"
                    />
                </div>
            </div>

            {/* Summary Section */}
            <div style={{
                padding: '20px',
                borderTop: '2px solid #374151',
                backgroundColor: 'rgba(17, 24, 39, 0.5)'
            }}>
                <div style={{
                    fontSize: '13px',
                    color: '#d1d5db',
                    lineHeight: '1.6',
                    marginBottom: '12px'
                }}>
                    <strong style={{ color: '#a78bfa' }}>Key Insight:</strong> While all three models were shown the same recent changes pattern,
                    only <strong style={{ color: '#a78bfa' }}>Sweep Next-Edit 1.5B</strong> made the precise, contextually appropriate edit.
                    The other models either made no changes or introduced extraneous modifications that could break the code.
                </div>
                <div style={{
                    fontSize: '12px',
                    color: '#9ca3af'
                }}>
                    <a
                        href="https://github.com/redisson/redisson/commit/e073ebd438a15307640b5708085050ec4b752af2#diff-28401df24ac8361a8aa3b482641114eda07efe40c7b85640f2812115da45aac7R71-R72"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: '#60a5fa',
                            textDecoration: 'none',
                            borderBottom: '1px dotted #60a5fa'
                        }}
                    >
                        View full commit on GitHub →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CodeComparisonDiagram;
