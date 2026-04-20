import { lazy, Suspense, useEffect, useTransition } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AppHeader } from './components/AppHeader'
import { Footer } from './components/Footer'
import { PageLoader } from './components/PageLoader'
import { NavigationProgress } from './components/NavigationProgress'

const HomePage          = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const AdvancedPage      = lazy(() => import('./pages/AdvancedPage').then(m => ({ default: m.AdvancedPage })))
const TemplatesPage     = lazy(() => import('./pages/TemplatesPage').then(m => ({ default: m.TemplatesPage })))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })))
const ChangelogPage     = lazy(() => import('./pages/ChangelogPage').then(m => ({ default: m.ChangelogPage })))
const GuidePage         = lazy(() => import('./pages/GuidePage').then(m => ({ default: m.GuidePage })))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  const [isPending] = useTransition()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <NavigationProgress />
      <ScrollToTop />
      <AppHeader />

      {/* Global pending overlay — faint dimming while new chunk loads */}
      {isPending && (
        <div className="pointer-events-none fixed inset-0 z-40 bg-white/20 dark:bg-slate-950/20 backdrop-blur-[1px] transition-opacity" />
      )}

      <div className="flex-1 flex flex-col">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/advanced" element={<AdvancedPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            <Route path="/guides/:slug" element={<GuidePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </div>

      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  )
}
