import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Landing from './pages/Landing'
import './styles/global.css'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111118',
            color: '#f0f0ff',
            border: '1px solid rgba(108, 99, 255, 0.3)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px'
          }
        }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}