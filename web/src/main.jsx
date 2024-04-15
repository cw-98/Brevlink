import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import Shortener from './components/Shortener.jsx'
import Navbar from './components/common/Navbar.jsx'
import Footer from './components/common/Footer.jsx'
import LinksTable from './components/common/Link.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'
import './style/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Shortener />} />
          <Route path="/links" element={<LinksTable />} />
        </Routes>
        <Footer/ >
      </AuthProvider>
    </React.StrictMode>
  </Router>,
)
