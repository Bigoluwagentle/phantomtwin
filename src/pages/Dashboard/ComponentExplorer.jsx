import { useState } from 'react'
import { generateCode } from '../../utils/api'
import toast from 'react-hot-toast'

export default function ComponentExplorer({ analysis, sessionId }) {
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(null)
  const [activeComponent, setActiveComponent] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const data = await generateCode(sessionId)
      setGenerated(data.code)
      toast.success('Components generated!')
    } catch (err) {
      toast.error('Generation failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
          Component Explorer
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          fontFamily: 'Space Grotesk, sans-serif',
          marginBottom: '8px'
        }}>
          Generated React Components
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          AI-generated components based on the site's structure.
        </p>
      </div>

      {!generated ? (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-xl)',
          padding: '48px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            fontFamily: 'Space Grotesk, sans-serif',
            marginBottom: '10px'
          }}>
            Generate React components
          </h3>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '14px',
            marginBottom: '28px',
            maxWidth: '400px',
            margin: '0 auto 28px'
          }}>
            AI will generate a full set of React components that recreate this site's layout and structure.
          </p>
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              fontFamily: 'Space Grotesk, sans-serif'
            }}
          >
            {loading ? 'Generating...' : 'Generate Components →'}
          </button>
        </div>
      ) : (
        <div>
          {generated.componentList?.length > 0 && (
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '20px'
            }}>
              {generated.componentList.map((comp, i) => (
                <button
                  key={i}
                  onClick={() => setActiveComponent(i)}
                  style={{
                    padding: '8px 16px',
                    background: activeComponent === i
                      ? 'rgba(108, 99, 255, 0.2)'
                      : 'var(--bg-card)',
                    border: activeComponent === i
                      ? '1px solid #6c63ff'
                      : '1px solid var(--border-secondary)',
                    borderRadius: 'var(--radius-md)',
                    color: activeComponent === i
                      ? 'var(--accent-primary)'
                      : 'var(--text-secondary)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                >
                  {comp.name}
                </button>
              ))}
            </div>
          )}

          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-secondary)',
            overflow: 'hidden',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 20px',
              borderBottom: '1px solid var(--border-secondary)'
            }}>
              <span style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace'
              }}>
                {generated.componentList?.[activeComponent]?.name || 'App'}.jsx
              </span>
              <button
                onClick={() => handleCopy(
                  generated.componentList?.[activeComponent]?.code || generated.reactComponent
                )}
                style={{
                  padding: '6px 14px',
                  background: copied ? 'rgba(40,200,64,0.15)' : 'rgba(108,99,255,0.15)',
                  border: copied ? '1px solid rgba(40,200,64,0.3)' : '1px solid rgba(108,99,255,0.3)',
                  borderRadius: '8px',
                  color: copied ? '#28c840' : 'var(--accent-primary)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {copied ? '✓ Copied' : 'Copy code'}
              </button>
            </div>
            <pre style={{
              padding: '20px',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              fontFamily: 'JetBrains Mono, monospace',
              overflow: 'auto',
              maxHeight: '500px',
              margin: 0,
              lineHeight: '1.6'
            }}>
              {generated.componentList?.[activeComponent]?.code || generated.reactComponent}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}