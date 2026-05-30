export default function InsightsPanel({ analysis }) {
  const ai = analysis?.aiAnalysis

  if (!ai) {
    return (
      <div style={{ color: 'var(--text-secondary)', padding: '40px 0' }}>
        No insights available.
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          fontSize: '11px',
          color: 'var(--accent-secondary)',
          fontFamily: 'JetBrains Mono, monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '8px'
        }}>
          AI Insights
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          fontFamily: 'Space Grotesk, sans-serif',
          marginBottom: '8px'
        }}>
          Design Intelligence Report
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          {ai.designStrategy?.summary}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-secondary)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px'
        }}>
          <div style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '8px'
          }}>
            Design Style
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: '600',
            fontFamily: 'Space Grotesk, sans-serif',
            color: 'var(--accent-primary)'
          }}>
            {ai.designStrategy?.designStyle}
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-secondary)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px'
        }}>
          <div style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '8px'
          }}>
            Primary Goal
          </div>
          <div style={{
            fontSize: '15px',
            fontWeight: '500',
            color: 'var(--text-primary)'
          }}>
            {ai.designStrategy?.primaryGoal}
          </div>
        </div>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-secondary)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          fontFamily: 'Space Grotesk, sans-serif',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          🎯 Target Audience
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Primary</div>
            <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500' }}>
              {ai.targetAudience?.primary}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Secondary</div>
            <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500' }}>
              {ai.targetAudience?.secondary}
            </div>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          {ai.targetAudience?.insights}
        </p>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-secondary)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          fontFamily: 'Space Grotesk, sans-serif',
          marginBottom: '16px'
        }}>
          💡 Conversion Techniques
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ai.conversionTechniques?.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '12px',
              padding: '14px',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-secondary)'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(108, 99, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--accent-primary)',
                flexShrink: 0
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                  {item.technique}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid rgba(40, 200, 64, 0.2)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px'
        }}>
          <h3 style={{
            fontSize: '15px',
            fontWeight: '600',
            fontFamily: 'Space Grotesk, sans-serif',
            marginBottom: '14px',
            color: '#28c840'
          }}>
            ✅ UX Strengths
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ai.uxStrengths?.map((s, i) => (
              <div key={i} style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start'
              }}>
                <span style={{ color: '#28c840', flexShrink: 0 }}>→</span>
                {s}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid rgba(255, 107, 107, 0.2)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px'
        }}>
          <h3 style={{
            fontSize: '15px',
            fontWeight: '600',
            fontFamily: 'Space Grotesk, sans-serif',
            marginBottom: '14px',
            color: '#ff6b6b'
          }}>
            ⚠️ UX Weaknesses
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ai.uxWeaknesses?.map((w, i) => (
              <div key={i} style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start'
              }}>
                <span style={{ color: '#ff6b6b', flexShrink: 0 }}>→</span>
                {w}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}