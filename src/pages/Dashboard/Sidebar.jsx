import { useNavigate } from 'react-router-dom'

const tabs = [
  { id: 'insights', icon: '🧠', label: 'AI Insights' },
  { id: 'dna', icon: '🧬', label: 'Design DNA' },
  { id: 'roast', icon: '🔥', label: 'Roast Mode' },
  { id: 'redesign', icon: '🎨', label: 'Redesign Mode' },
  { id: 'components', icon: '⚡', label: 'Components' },
]

export default function Sidebar({ analysis, activeTab, setActiveTab }) {
  const navigate = useNavigate()

  return (
    <aside style={{
      width: '260px',
      minHeight: '100vh',
      background: 'var(--bg-card)',
      borderRight: '1px solid var(--border-secondary)',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50
    }}>
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid var(--border-secondary)'
      }}>
        <div
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          <div style={{
            width: '28px',
            height: '28px',
            background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
            borderRadius: '7px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '700',
            color: 'white'
          }}>
            P
          </div>
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: '700',
            fontSize: '16px',
            background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            PhantomTwin
          </span>
        </div>

        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '12px'
        }}>
          <div style={{
            fontSize: '10px',
            color: 'var(--text-muted)',
            fontFamily: 'JetBrains Mono, monospace',
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            Analyzing
          </div>
          <div style={{
            fontSize: '13px',
            color: 'var(--accent-secondary)',
            fontFamily: 'JetBrains Mono, monospace',
            wordBreak: 'break-all'
          }}>
            {analysis?.url?.replace('https://', '').replace('http://', '')}
          </div>
          <div style={{
            marginTop: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 10px',
            background: 'rgba(40, 200, 64, 0.1)',
            border: '1px solid rgba(40, 200, 64, 0.3)',
            borderRadius: '100px',
            fontSize: '11px',
            color: '#28c840'
          }}>
            <div style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#28c840'
            }} />
            Complete
          </div>
        </div>
      </div>

      <nav style={{ padding: '16px 12px', flex: 1 }}>
        <div style={{
          fontSize: '10px',
          color: 'var(--text-muted)',
          fontFamily: 'JetBrains Mono, monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '0 8px',
          marginBottom: '8px'
        }}>
          Analysis Panels
        </div>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 12px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === tab.id
                ? 'rgba(108, 99, 255, 0.15)'
                : 'transparent',
              color: activeTab === tab.id
                ? '#f0f0ff'
                : 'var(--text-secondary)',
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? '600' : '400',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              borderLeft: activeTab === tab.id
                ? '2px solid #6c63ff'
                : '2px solid transparent',
              marginBottom: '2px'
            }}
          >
            <span style={{ fontSize: '16px' }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--border-secondary)'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            padding: '10px',
            background: 'transparent',
            border: '1px solid var(--border-secondary)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          ← Analyze another site
        </button>
      </div>
    </aside>
  )
}