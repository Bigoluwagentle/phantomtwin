import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const linkStyle = {
  color: '#8888aa',
  fontSize: '15px',
  textDecoration: 'none',
  padding: '12px 8px',
  borderRadius: '8px',
  display: 'block'
}

const btnStyle = {
  width: '100%',
  padding: '14px',
  background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontWeight: '600',
  fontSize: '15px',
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif'
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '16px 24px',
        background: scrolled || menuOpen ? 'rgba(5, 5, 8, 0.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled || menuOpen
          ? '1px solid rgba(108, 99, 255, 0.15)'
          : '1px solid transparent',
        transition: 'all 0.3s ease'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: '700',
              color: 'white',
              flexShrink: 0
            }}
          >
            P
          </div>
          <span
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: '700',
              fontSize: '18px',
              background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            PhantomTwin
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <a href="#features" style={{ color: '#8888aa', fontSize: '14px', textDecoration: 'none' }}>
                Features
              </a>
              <a href="#how-it-works" style={{ color: '#8888aa', fontSize: '14px', textDecoration: 'none' }}>
                How it works
              </a>
              <a href="#examples" style={{ color: '#8888aa', fontSize: '14px', textDecoration: 'none' }}>
                Examples
              </a>
            </div>
          )}

          {!isMobile && (
            <Link to="/analyze" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Try it free
              </button>
            </Link>
          )}

          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
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
              <div
                style={{
                  width: '18px',
                  height: '2px',
                  background: '#f0f0ff',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
                }}
              />
              <div
                style={{
                  width: '18px',
                  height: '2px',
                  background: '#f0f0ff',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  opacity: menuOpen ? 0 : 1
                }}
              />
              <div
                style={{
                  width: '18px',
                  height: '2px',
                  background: '#f0f0ff',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
                }}
              />
            </button>
          )}
        </div>
      </div>

      {isMobile && menuOpen && (
        <div
          style={{
            paddingTop: '20px',
            paddingBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            borderTop: '1px solid rgba(108,99,255,0.15)',
            marginTop: '16px'
          }}
        >
          <a href="#features" onClick={() => setMenuOpen(false)} style={linkStyle}>
            Features
          </a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} style={linkStyle}>
            How it works
          </a>
          <a href="#examples" onClick={() => setMenuOpen(false)} style={linkStyle}>
            Examples
          </a>
          <Link
            to="/analyze"
            onClick={() => setMenuOpen(false)}
            style={{ textDecoration: 'none', marginTop: '8px' }}
          >
            <button style={btnStyle}>
              Try it free
            </button>
          </Link>
        </div>
      )}
    </nav>
  )
}