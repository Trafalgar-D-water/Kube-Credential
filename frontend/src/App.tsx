import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import './App.css'
import IssuePage from './pages/IssuePage'
import VerifyPage from './pages/VerifyPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <nav className="border-b bg-white">
          <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
            <Link to="/" className="font-semibold">Kube Credential</Link>
            <div className="flex gap-4">
              <NavLink to="/issue" className={({isActive}) => isActive ? 'text-blue-600' : ''}>Issue</NavLink>
              <NavLink to="/verify" className={({isActive}) => isActive ? 'text-blue-600' : ''}>Verify</NavLink>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-4xl px-4 py-6">
          <Routes>
            <Route path="/" element={<IssuePage />} />
            <Route path="/issue" element={<IssuePage />} />
            <Route path="/verify" element={<VerifyPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
