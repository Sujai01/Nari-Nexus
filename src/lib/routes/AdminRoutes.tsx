import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/lib/store/authStore'
import { useEffect } from 'react'
import LoginPage from '@/pages/admin/LoginPage'
import DashboardPage from '@/pages/admin/DashboardPage'
import RegistrationsPage from '@/pages/admin/RegistrationsPage'
import SpeakersAdminPage from '@/pages/admin/SpeakersAdminPage'
import EventsAdminPage from '@/pages/admin/EventsAdminPage'
import Layout from '@/components/admin/Layout'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, initialized } = useAuthStore()

  if (!initialized) return null
  if (!user) return <Navigate to="/admin/login" replace />

  return <>{children}</>
}

export default function AdminRoutes() {
  const { initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        path=""
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="registrations" element={<RegistrationsPage />} />
        <Route path="speakers" element={<SpeakersAdminPage />} />
        <Route path="events" element={<EventsAdminPage />} />
      </Route>
    </Routes>
  )
}