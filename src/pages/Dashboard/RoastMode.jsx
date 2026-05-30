export default function RoastMode({ analysis }) {
  const roast = analysis?.aiAnalysis?.roastMode

  const rating = roast?.overallRating || 0
  const filled = Math.round(rating)

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          fontSize: '11px',
          color: '#ff6b6b',
          fontFamily: 'JetBrains Mono, monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '8px'
        }}>
          Roast Mode 🔥
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          fontFamily: 'Space Grotesk, sans-serif',
          marginBottom: '8px'
        }}>
          Brutally Honest UX Critique
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          No sugarcoating. Here's what the AI really thinks.
        </p>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(108,99,255,0.1))',
        border: '1px solid rgba(255, 107, 107, 0.3)',
        borderRadius: 'var(--radius-xl)',
        padding: '32px',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '64px',
          fontWeight: '700',
          fontFamily: 'Space Grotesk, sans-serif',
          background: 'linear-gradient(135deg, #ff6b6b, #6c63ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '8px'
        }}>
          {rating}/10
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '20px' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} style={{
              width: '20px',
              height: '6px',
              borderRadius: '3px',
              background: i < filled
                ? 'linear-gradient(90deg, #ff6b6b, #6c63ff)'
                : 'var(--border-secondary)'
            }} />
          ))}
        </div>
        <p style={{
          fontSize: '18px',
          fontWeight: '600',
          fontFamily: 'Space Grotesk, sans-serif',
          color: 'var(--text-primary)',
          fontStyle: 'italic'
        }}>
          "{roast?.verdict}"
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
          border: '1px solid rgba(255, 107, 107, 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px'
        }}>
          <div style={{
            fontSize: '13px',
            color: '#ff6b6b',
            fontWeight: '600',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            💀 Biggest Mistake
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {roast?.biggestMistake}
          </p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid rgba(40, 200, 64, 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px'
        }}>
          <div style={{
            fontSize: '13px',
            color: '#28c840',
            fontWeight: '600',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            💎 Hidden Gem
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {roast?.hiddenGem}
          </p>
        </div>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-secondary)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          fontFamily: 'Space Grotesk, sans-serif',
          marginBottom: '16px'
        }}>
          🛠️ Redesign Suggestions
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Object.entries(analysis?.aiAnalysis?.redesignSuggestions || {}).map(([style, suggestion]) => (
            <div key={style} style={{
              padding: '16px',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-secondary)'
            }}>
              <div style={{
                fontSize: '12px',
                fontFamily: 'JetBrains Mono, monospace',
                color: 'var(--accent-primary)',
                marginBottom: '6px',
                textTransform: 'uppercase'
              }}>
                {style}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {suggestion}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}