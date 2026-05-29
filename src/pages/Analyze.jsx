import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAnalysisStatus } from '../utils/api'
import Navbar from '../components/ui/Navbar'
import ParticleBackground from '../components/ui/ParticleBackground'

const steps = [
  { id: 'scraping', label: 'Scraping website', description: 'Extracting HTML, styles and structure' },
  { id: 'analyzing', label: 'AI analyzing design', description: 'Gemini studying layout, UX and strategy' },
  { id: 'generating', label: 'Generating insights', description: 'Building your full analysis report' },
  { id: 'complete', label: 'Analysis complete', description: 'Your report is ready' }
]

const statusOrder = ['pending', 'scraping', 'analyzing', 'generating', 'complete']

export default function Analyze() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState(null)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    return () => clearInterval(dotsInterval)
  }, [])

  useEffect(() => {
    if (!sessionId) {
      navigate('/')
      return
    }

    const poll = async () => {
      try {
        const data = await getAnalysisStatus(sessionId)
        setAnalysis(data)

        if (data.status === 'complete') {
          setTimeout(() => {
            navigate('/dashboard/' + sessionId)
          }, 1500)
        } else if (data.status === 'failed') {
          setError(data.errorMessage || 'Analysis failed')
        }
      } catch (err) {
        setError('Failed to connect to server')
      }
    }

    poll()
    const interval = setInterval(() => {
      if (analysis?.status !== 'complete' && analysis?.status !== 'failed') {
        poll()
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [sessionId])

  const getCurrentStepIndex = () => {
    if (!analysis) return 0
    return statusOrder.indexOf(analysis.status)
  }

  const currentIndex = getCurrentStepIndex()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative' }}>
      <ParticleBackground />
      <Navbar />

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        zIndex: 1
      }}>

        {error ? (
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>⚠️</div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              fontFamily: 'Space Grotesk, sans-serif',
              marginBottom: '12px',
              color: '#ff6b6b'
            }}>
              Analysis failed
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px' }}>
              {error}
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '12px 28px',
                background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '15px',
                cursor: 'pointer'
              }}
            >
              Try another URL
            </button>
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: '640px' }}>

            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,212,255,0.1))',
                border: '2px solid rgba(108,99,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                margin: '0 auto 24px',
                animation: 'pulse-glow 2s ease-in-out infinite'
              }}>
                👻
              </div>
              <h1 style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: '700',
                fontFamily: 'Space Grotesk, sans-serif',
                marginBottom: '12px'
              }}>
                {analysis?.status === 'complete'
                  ? 'Analysis complete!'
                  : 'Analyzing' + dots}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                {analysis?.url || 'Loading...'}
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-xl)',
              padding: '32px',
              marginBottom: '32px'
            }}>
              {steps.map((step, index) => {
                const isComplete = currentIndex > index + 1
                const isActive = currentIndex === index + 1
                const isPending = currentIndex < index + 1

                return (
                  <div
                    key={step.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      marginBottom: index < steps.length - 1 ? '28px' : '0',
                      opacity: isPending ? 0.4 : 1,
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: isComplete
                          ? 'linear-gradient(135deg, #6c63ff, #00d4ff)'
                          : isActive
                            ? 'rgba(108, 99, 255, 0.2)'
                            : 'var(--bg-secondary)',
                        border: isActive
                          ? '2px solid #6c63ff'
                          : isComplete
                            ? 'none'
                            : '2px solid var(--border-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        transition: 'all 0.3s ease',
                        animation: isActive ? 'pulse-glow 1.5s ease-in-out infinite' : 'none'
                      }}>
                        {isComplete ? '✓' : isActive ? (
                          <div style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: '#6c63ff',
                            animation: 'pulse-glow 1s ease-in-out infinite'
                          }} />
                        ) : (
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'var(--text-muted)'
                          }} />
                        )}
                      </div>

                      {index < steps.length - 1 && (
                        <div style={{
                          position: 'absolute',
                          top: '36px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '2px',
                          height: '28px',
                          background: isComplete
                            ? 'linear-gradient(180deg, #6c63ff, rgba(108,99,255,0.3))'
                            : 'var(--border-secondary)'
                        }} />
                      )}
                    </div>

                    <div style={{ paddingTop: '6px' }}>
                      <div style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        fontFamily: 'Space Grotesk, sans-serif',
                        color: isActive ? '#f0f0ff' : isComplete ? '#6c63ff' : 'var(--text-secondary)',
                        marginBottom: '4px'
                      }}>
                        {step.label}
                        {isActive && (
                          <span style={{
                            marginLeft: '8px',
                            fontSize: '12px',
                            color: '#00d4ff',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontWeight: '400'
                          }}>
                            running{dots}
                          </span>
                        )}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: 'var(--text-muted)'
                      }}>
                        {step.description}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-secondary)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px 24px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '13px',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '12px', fontSize: '11px' }}>
                LIVE LOG
              </div>
              {analysis?.status === 'pending' && (
                <div style={{ color: '#00d4ff' }}>→ Initializing analysis engine{dots}</div>
              )}
              {(analysis?.status === 'scraping' || currentIndex > 1) && (
                <div style={{ color: '#6c63ff', marginBottom: '6px' }}>✓ Connected to target URL</div>
              )}
              {(analysis?.status === 'scraping') && (
                <div style={{ color: '#00d4ff' }}>→ Extracting DOM structure{dots}</div>
              )}
              {(analysis?.status === 'analyzing' || currentIndex > 2) && (
                <div style={{ color: '#6c63ff', marginBottom: '6px' }}>✓ Scraped {analysis?.scrapedData?.headings?.length || 0} headings, {analysis?.scrapedData?.colors?.length || 0} colors</div>
              )}
              {analysis?.status === 'analyzing' && (
                <div style={{ color: '#00d4ff' }}>→ Gemini AI processing design patterns{dots}</div>
              )}
              {(analysis?.status === 'generating' || currentIndex > 3) && (
                <div style={{ color: '#6c63ff', marginBottom: '6px' }}>✓ AI analysis complete</div>
              )}
              {analysis?.status === 'generating' && (
                <div style={{ color: '#00d4ff' }}>→ Generating insights report{dots}</div>
              )}
              {analysis?.status === 'complete' && (
                <div style={{ color: '#28c840' }}>✓ All systems complete — redirecting to dashboard</div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}