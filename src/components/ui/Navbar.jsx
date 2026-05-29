import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(5, 5, 8, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(108, 99, 255, 0.15)' : '1px solid transparent',
      transition: 'all 0.3s ease'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{
          width: '32px',
          height: '32px',
          background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: '700',
          color: 'white'
        }}>
          P
        </div>
        <span style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: '700',
          fontSize: '18px',
          background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          PhantomTwin
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <a href="#features" style={{ color: '#8888aa', fontSize: '14px', textDecoration: 'none' }}>Features</a>
        <a href="#how-it-works" style={{ color: '#8888aa', fontSize: '14px', textDecoration: 'none' }}>How it works</a>
        <a href="#examples" style={{ color: '#8888aa', fontSize: '14px', textDecoration: 'none' }}>Examples</a>
      </div>

      <Link to="/analyze" style={{ textDecoration: 'none' }}>
        <button style={{
          padding: '10px 20px',
          fontSize: '14px',
          background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Try it free
        </button>
      </Link>
    </nav>
  )
}