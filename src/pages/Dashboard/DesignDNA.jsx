export default function DesignDNA({ analysis }) {
  const ai = analysis?.aiAnalysis
  const scraped = analysis?.scrapedData

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
          Design DNA
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          fontFamily: 'Space Grotesk, sans-serif',
          marginBottom: '8px'
        }}>
          Design System Extraction
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Every design token extracted from the site.
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
          🎨 Color Palette
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          marginBottom: '16px'
        }}>
          {ai?.colorSystem?.strategy}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {scraped?.colors?.length > 0
            ? scraped.colors.slice(0, 12).map((color, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: color,
                  border: '1px solid var(--border-secondary)'
                }} />
                <span style={{
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  fontFamily: 'JetBrains Mono, monospace'
                }}>
                  {color.slice(0, 9)}
                </span>
              </div>
            ))
            : (
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                No inline colors detected — site likely uses CSS classes.
              </p>
            )
          }
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
          marginBottom: '8px'
        }}>
          ✏️ Typography
        </h3>
        <div style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          marginBottom: '16px'
        }}>
          {ai?.typography?.strategy}
        </div>
        <div style={{
          padding: '16px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '12px'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Style</div>
          <div style={{ fontSize: '15px', fontWeight: '500' }}>{ai?.typography?.style}</div>
        </div>
        {scraped?.fonts?.length > 0 && (
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Google Fonts detected
            </div>
            {scraped.fonts.map((font, i) => (
              <div key={i} style={{
                fontSize: '12px',
                color: 'var(--accent-secondary)',
                fontFamily: 'JetBrains Mono, monospace',
                padding: '8px 12px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '6px',
                wordBreak: 'break-all'
              }}>
                {font}
              </div>
            ))}
          </div>
        )}
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
          🧩 Component Breakdown
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ai?.componentBreakdown?.map((comp, i) => (
            <div key={i} style={{
              padding: '16px',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-secondary)',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                padding: '6px 12px',
                background: 'rgba(108, 99, 255, 0.15)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono, monospace',
                color: 'var(--accent-primary)',
                flexShrink: 0
              }}>
                {comp.name}
              </div>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {comp.purpose}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {comp.notableDetail}
                </div>
              </div>
            </div>
          ))}
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
          📝 Content Structure
        </h3>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Headings found
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {scraped?.headings?.map((h, i) => (
              <div key={i} style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                padding: '8px 12px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '2px solid var(--accent-primary)'
              }}>
                {h}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}