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
        <div style={{
          textAlign: 'center',
          fontFamily: 'Space Grotesk, sans-serif'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>👻</div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading dashboard...</p>
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      fontFamily: 'Inter, sans-serif'
    }}>
      <Sidebar
        analysis={analysis}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main style={{
        flex: 1,
        marginLeft: '260px',
        minHeight: '100vh',
        overflow: 'auto'
      }}>
        <div style={{
          padding: '32px',
          maxWidth: '1000px'
        }}>
          {renderPanel()}
        </div>
      </main>
    </div>
  )
}

// sharp 