import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from './redux/slices/authSlice.js'
import { selectIsAuthenticated, selectAuthLoading } from './redux/slices/authSlice.js'

// Layouts
import DashboardLayout from './layouts/DashboardLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import LandingLayout from './layouts/LandingLayout.jsx'

// Landing Pages
import HomePage from './pages/landing/HomePage.jsx'
import Demo from './pages/landing/Demo.jsx'
import DemandeDevis from './pages/landing/DemandeDevis.jsx'

// Auth Pages
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'

// RRH Pages
import DashboardRRH from './pages/rrh/DashboardRRH.jsx'

// RF Pages
import DashboardRF from './pages/rf/DashboardRF.jsx'

// Manager Pages
import DashboardManager from './pages/manager/DashboardManager.jsx'

// Employee Pages
import DashboardEmployee from './pages/employee/DashboardEmployee.jsx'
import MesFormations from './pages/employee/MesFormations.jsx'
import DemandeFormation from './pages/employee/DemandeFormation.jsx'

// Trainer Pages
import DashboardFormateur from './pages/formateur/DashboardFormateur.jsx'

// Admin Pages
import DashboardAdmin from './pages/admin/DashboardAdmin.jsx'

// Loading Component
import LoadingSpinner from './components/common/LoadingSpinner.jsx'

function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const loading = useSelector(selectAuthLoading)

  useEffect(() => {
    // Check if user is authenticated on app load
    if (localStorage.getItem('token')) {
      dispatch(getCurrentUser())
    }
  }, [dispatch])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      {/* Public Landing Routes */}
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<HomePage />} />
        <Route path="demo" element={<Demo />} />
        <Route path="demande-devis" element={<DemandeDevis />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/auth/login" />}
      >
        {/* RRH Routes */}
        <Route path="rrh" element={<DashboardRRH />} />

        {/* RF Routes */}
        <Route path="rf" element={<DashboardRF />} />

        {/* Manager Routes */}
        <Route path="manager" element={<DashboardManager />} />

        {/* Employee Routes */}
        <Route path="employee" element={<DashboardEmployee />} />
        <Route path="employee/mes-formations" element={<MesFormations />} />
        <Route path="employee/demande-formation" element={<DemandeFormation />} />

        {/* Trainer Routes */}
        <Route path="formateur" element={<DashboardFormateur />} />

        {/* Admin Routes */}
        <Route path="admin" element={<DashboardAdmin />} />

        {/* Default redirect */}
        <Route index element={<Navigate to="/dashboard/employee" replace />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
