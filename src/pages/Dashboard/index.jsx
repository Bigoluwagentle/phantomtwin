import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAnalysisStatus } from '../../utils/api'
import Sidebar from './Sidebar'
import InsightsPanel from './InsightsPanel'
import DesignDNA from './DesignDNA'
import RoastMode from './RoastMode'
import RedesignMode from './RedesignMode'
import ComponentExplorer from './ComponentExplorer'

export default function Dashboard() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('insights')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!sessionId) {
      navigate('/')
      return
    }
    const fetchAnalysis = async () => {
      try {
        const data = await getAnalysisStatus(sessionId)
        if (data.status !== 'complete') {
          navigate('/analyze/' + sessionId)
          return
        }
        setAnalysis(data)
      } catch (err) {
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchAnalysis()
  }, [sessionId])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>👻</div>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif' }}>
            Loading dashboard...
          </p>
        </div>
      </div>
    )
  }

  const renderPanel = () => {
    switch (activeTab) {
      case 'insights': return <InsightsPanel analysis={analysis} />
      case 'dna': return <DesignDNA analysis={analysis} />
      case 'roast': return <RoastMode analysis={analysis} />
      case 'redesign': return <RedesignMode analysis={analysis} sessionId={sessionId} />
      case 'components': return <ComponentExplorer analysis={analysis} sessionId={sessionId} />
      default: return <InsightsPanel analysis={analysis} />
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      fontFamily: 'Inter, sans-serif'
    }}>
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 40
          }}
        />
      )}

      <div style={{
        position: 'fixed',
        top: 0,
        left: isMobile ? (sidebarOpen ? 0 : '-260px') : 0,
        width: '260px',
        height: '100vh',
        zIndex: 50,
        transition: 'left 0.3s ease'
      }}>
        <Sidebar
          analysis={analysis}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />
      </div>

      {isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          padding: '14px 20px',
          background: 'rgba(5,5,8,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(108,99,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
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
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(108,99,255,0.3)',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px'
            }}
          >
            <div style={{ width: '18px', height: '2px', background: '#f0f0ff', borderRadius: '2px' }} />
            <div style={{ width: '18px', height: '2px', background: '#f0f0ff', borderRadius: '2px' }} />
            <div style={{ width: '18px', height: '2px', background: '#f0f0ff', borderRadius: '2px' }} />
          </button>
        </div>
      )}

      <main style={{
        flex: 1,
        marginLeft: isMobile ? 0 : '260px',
        minHeight: '100vh',
        overflow: 'auto',
        paddingTop: isMobile ? '70px' : '0'
      }}>
        <div style={{
          padding: isMobile ? '20px 16px' : '32px',
          maxWidth: '1000px'
        }}>
          {renderPanel()}
        </div>
      </main>

      {isMobile && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          background: 'rgba(5,5,8,0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(108,99,255,0.15)',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '8px 0'
        }}>
          {[
            { id: 'insights', icon: '🧠', label: 'Insights' },
            { id: 'dna', icon: '🧬', label: 'DNA' },
            { id: 'roast', icon: '🔥', label: 'Roast' },
            { id: 'redesign', icon: '🎨', label: 'Redesign' },
            { id: 'components', icon: '⚡', label: 'Code' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '8px',
                opacity: activeTab === tab.id ? 1 : 0.5
              }}
            >
              <span style={{ fontSize: '20px' }}>{tab.icon}</span>
              <span style={{
                fontSize: '10px',
                color: activeTab === tab.id ? '#6c63ff' : '#8888aa',
                fontWeight: activeTab === tab.id ? '600' : '400'
              }}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}