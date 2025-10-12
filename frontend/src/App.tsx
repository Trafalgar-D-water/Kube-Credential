import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import './App.css'
import IssuePage from './pages/IssuePage'
import VerifyPage from './pages/VerifyPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">KC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kube Credential</h1>
                <p className="text-xs text-gray-500">Digital Certification Platform</p>
              </div>
            </Link>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <NavLink 
                to="/issue" 
                className={({isActive}) => 
                  `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                Issue Credential
              </NavLink>
              <NavLink 
                to="/verify" 
                className={({isActive}) => 
                  `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-white text-green-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                Verify Credential
              </NavLink>
            </div>
          </div>
        </nav>
        <main className="px-4 py-8">
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
