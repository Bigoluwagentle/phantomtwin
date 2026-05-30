import { useState } from 'react'
import { redesignWebsite } from '../../utils/api'
import toast from 'react-hot-toast'

const styles = [
  { id: 'futuristic', label: 'Futuristic', icon: '🚀', description: 'Dark, electric, high-tech' },
  { id: 'cyberpunk', label: 'Cyberpunk', icon: '🌆', description: 'Neon, gritty, dystopian' },
  { id: 'apple', label: 'Apple-inspired', icon: '🍎', description: 'Clean, premium, minimal' },
  { id: 'gaming', label: 'Gaming UI', icon: '🎮', description: 'Bold, energetic, esports' },
  { id: 'minimalistSaas', label: 'Minimalist SaaS', icon: '⚡', description: 'Calm, focused, productive' }
]

export default function RedesignMode({ analysis, sessionId }) {
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleRedesign = async () => {
    if (!selectedStyle) {
      toast.error('Please select a style first')
      return
    }
    setLoading(true)
    setResult(null)
    try {
      const data = await redesignWebsite(sessionId, selectedStyle)
      setResult(data.redesign)
      toast.success('Redesign generated!')
    } catch (err) {
      toast.error('Redesign failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (result?.reactComponent) {
      navigator.clipboard.writeText(result.reactComponent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
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
          Redesign Mode
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          fontFamily: 'Space Grotesk, sans-serif',
          marginBottom: '8px'
        }}>
          Transform the Design
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Pick a style and AI will completely reimagine the site.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '24px'
      }}>
        {styles.map(style => (
          <button
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            style={{
              padding: '20px',
              background: selectedStyle === style.id
                ? 'rgba(108, 99, 255, 0.15)'
                : 'var(--bg-card)',
              border: selectedStyle === style.id
                ? '2px solid #6c63ff'
                : '1px solid var(--border-secondary)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ fontSize: '28px', marginBottom: '10px' }}>{style.icon}</div>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '4px',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              {style.label}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {style.description}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleRedesign}
        disabled={loading || !selectedStyle}
        style={{
          width: '100%',
          padding: '16px',
          background: selectedStyle
            ? 'linear-gradient(135deg, #6c63ff, #00d4ff)'
            : 'var(--bg-card)',
          border: 'none',
          borderRadius: 'var(--radius-lg)',
          color: selectedStyle ? 'white' : 'var(--text-muted)',
          fontSize: '16px',
          fontWeight: '600',
          cursor: selectedStyle ? 'pointer' : 'not-allowed',
          marginBottom: '24px',
          transition: 'all 0.2s ease',
          fontFamily: 'Space Grotesk, sans-serif'
        }}
      >
        {loading ? 'Generating redesign...' : 'Generate Redesign →'}
      </button>

      {result && (
        <div>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              fontStyle: 'italic',
              marginBottom: '12px'
            }}>
              {result.styleNotes}
            </div>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-secondary)',
            overflow: 'hidden'
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
                RedesignedSite.jsx
              </span>
              <button
                onClick={handleCopy}
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
              maxHeight: '400px',
              margin: 0,
              lineHeight: '1.6'
            }}>
              {result.reactComponent}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}