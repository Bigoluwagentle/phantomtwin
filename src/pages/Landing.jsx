import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
import ParticleBackground from '../components/ui/ParticleBackground'
import { startAnalysis } from '../utils/api'
import toast from 'react-hot-toast'

const features = [
  {
    icon: '🧬',
    title: 'Design DNA extraction',
    description: 'Pulls every color, font, spacing token, and component pattern from any website automatically.'
  },
  {
    icon: '🤖',
    title: 'AI UX analysis',
    description: 'Gemini AI studies the site\'s strategy, target audience, conversion techniques, and UX decisions.'
  },
  {
    icon: '⚡',
    title: 'React code generation',
    description: 'Generates clean, reusable React components that recreate the site\'s layout and structure.'
  },
  {
    icon: '👻',
    title: 'Ghost diff mode',
    description: 'Side-by-side comparison of the original and the AI clone with visual difference highlighting.'
  },
  {
    icon: '🎨',
    title: 'Redesign mode',
    description: 'Transform any site into futuristic, cyberpunk, Apple-inspired, gaming, or minimalist SaaS style.'
  },
  {
    icon: '🔥',
    title: 'AI roast mode',
    description: 'Brutally honest UX critique — what works, what doesn\'t, and exactly how to fix it.'
  }
]

const steps = [
  { number: '01', title: 'Paste any URL', description: 'Drop in any website URL and PhantomTwin starts working instantly.' },
  { number: '02', title: 'AI scans everything', description: 'Our engine scrapes the site, extracts its design system, and feeds it to Gemini AI.' },
  { number: '03', title: 'Get deep insights', description: 'Receive a full breakdown of design strategy, UX decisions, and conversion techniques.' },
  { number: '04', title: 'Export the clone', description: 'Download the recreated React components and design tokens, ready to use.' }
]

export default function Landing() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast.error('Please enter a URL')
      return
    }

    setLoading(true)
    try {
      const data = await startAnalysis(url)
      toast.success('Analysis started!')
      navigate(`/analyze/${data.sessionId}`)
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to start analysis')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAnalyze()
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative' }}>
      <ParticleBackground />
      <Navbar />

      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="badge animate-fade-up" style={{ marginBottom: '28px' }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#00d4ff',
            display: 'inline-block',
            animation: 'pulse-glow 2s ease-in-out infinite'
          }} />
          AI-powered website reverse engineering
        </div>

        <h1 style={{
          fontSize: 'clamp(42px, 7vw, 88px)',
          fontWeight: '700',
          lineHeight: '1.05',
          marginBottom: '24px',
          fontFamily: 'Space Grotesk, sans-serif',
          animation: 'fadeInUp 0.6s ease 0.1s both'
        }}>
          Reverse engineer
          <br />
          <span className="glow-text">any website</span>
          <br />
          with AI
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: 'var(--text-secondary)',
          maxWidth: '560px',
          marginBottom: '48px',
          lineHeight: '1.7',
          animation: 'fadeInUp 0.6s ease 0.2s both'
        }}>
          PhantomTwin analyzes any website's design strategy, extracts its component system,
          and recreates it as production-ready React code — in seconds.
        </p>

        {/* URL Input */}
        <div style={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
          animation: 'fadeInUp 0.6s ease 0.3s both',
          flexWrap: 'wrap'
        }}>
          <div style={{
            flex: 1,
            minWidth: '280px',
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '0 16px',
            gap: '10px',
            boxShadow: '0 0 30px var(--accent-glow)'
          }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>
              https://
            </span>
            <input
              type="text"
              placeholder="stripe.com"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '16px',
                padding: '16px 0',
                fontFamily: 'var(--font-mono)'
              }}
            />
          </div>
          <button
            className="btn-primary"
            onClick={handleAnalyze}
            disabled={loading}
            style={{
              padding: '16px 28px',
              fontSize: '15px',
              opacity: loading ? 0.7 : 1,
              whiteSpace: 'nowrap'
            }}
          >
            {loading ? 'Starting...' : 'Analyze →'}
          </button>
        </div>

        <p style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
          animation: 'fadeInUp 0.6s ease 0.4s both'
        }}>
          Try: stripe.com • notion.so • linear.app • vercel.com
        </p>

        {/* Hero visual */}
        <div style={{
          marginTop: '80px',
          width: '100%',
          maxWidth: '900px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          boxShadow: '0 0 60px var(--accent-glow)',
          animation: 'fadeInUp 0.6s ease 0.5s both'
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            {['#ff5f57', '#febc2e', '#28c840'].map(c => (
              <div key={c} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />
            ))}
            <div style={{
              flex: 1,
              background: 'var(--bg-secondary)',
              borderRadius: '6px',
              padding: '4px 12px',
              fontSize: '12px',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)'
            }}>
              phantomtwin.ai/analyze
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', minHeight: '200px' }}>
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ fontSize: '12px', color: 'var(--accent-secondary)', fontFamily: 'var(--font-mono)' }}>
                // AI Analysis
              </div>
              {['Design strategy: Premium SaaS', 'Target: Dev teams', 'Conversion: Free trial CTA', 'UX score: 9.2/10'].map(line => (
                <div key={line} style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: 'var(--accent-primary)' }}>→</span>
                  {line}
                </div>
              ))}
            </div>

            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ fontSize: '12px', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                // Generated components
              </div>
              {['Navbar.jsx', 'HeroSection.jsx', 'FeatureGrid.jsx', 'PricingCard.jsx', 'Footer.jsx'].map(file => (
                <div key={file} style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: '#00d4ff' }}>📄</span>
                  {file}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge" style={{ marginBottom: '16px' }}>Features</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: '700', marginBottom: '16px' }}>
              Everything you need to
              <span className="glow-text"> understand any product</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
              PhantomTwin goes beyond cloning — it teaches you how great products are built.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}>
            {features.map((feature, i) => (
              <div key={i} className="card" style={{ padding: '28px' }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '16px',
                  display: 'inline-block',
                  padding: '12px',
                  background: 'rgba(108, 99, 255, 0.1)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '10px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge" style={{ marginBottom: '16px' }}>How it works</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: '700' }}>
              From URL to
              <span className="glow-text"> full analysis</span>
              <br />in seconds
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            {steps.map((step, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <div className="card" style={{ padding: '28px' }}>
                  <div style={{
                    fontSize: '48px',
                    fontWeight: '700',
                    fontFamily: 'Space Grotesk, sans-serif',
                    background: 'linear-gradient(135deg, rgba(108,99,255,0.3), rgba(0,212,255,0.1))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '16px',
                    lineHeight: 1
                  }}>
                    {step.number}
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '10px',
                    fontFamily: 'Space Grotesk, sans-serif'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(48px, 6vw, 80px)',
            textAlign: 'center',
            boxShadow: '0 0 80px var(--accent-glow)'
          }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: '700', marginBottom: '16px' }}>
              Ready to reverse engineer
              <br />
              <span className="glow-text">your first website?</span>
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '18px',
              marginBottom: '40px',
              maxWidth: '480px',
              margin: '0 auto 40px'
            }}>
              Paste any URL and get a full AI analysis, design system breakdown, and React code in seconds.
            </p>
            <button className="btn-primary" style={{ padding: '18px 40px', fontSize: '17px' }}
              onClick={() => navigate('/analyze')}>
              Start analyzing for free →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-secondary)',
        padding: '40px 24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{
            width: '24px',
            height: '24px',
            background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '700',
            color: 'white'
          }}>P</div>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600', fontSize: '15px' }}>PhantomTwin</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          Built for the 30-day coding challenge · Powered by Gemini AI
        </p>
      </footer>
    </div>
  )
}