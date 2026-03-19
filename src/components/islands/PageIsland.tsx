/**
 * PageIsland - Wraps React page components for use in Astro pages.
 *
 * Provides:
 * - AuthProvider (for useAuth hook)
 * - BrowserRouter (for useNavigate, useParams, useLocation)
 * - HelmetProvider (for react-helmet-async compatibility)
 * - NavigationBridge (converts React Router navigations to full page loads)
 */
import { type ReactNode, useLayoutEffect, useRef } from 'react'
import { BrowserRouter, useLocation, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from '../../contexts/AuthContext'

/**
 * Intercepts React Router navigations and converts them to full page loads.
 * This is needed because in Astro, each page is its own HTML file -
 * client-side routing would show a blank page instead of loading the target.
 */
function NavigationBridge({ children }: { children: ReactNode }) {
  const location = useLocation()
  const initialPath = useRef(window.location.pathname)

  useLayoutEffect(() => {
    if (location.pathname !== initialPath.current) {
      window.location.href = location.pathname + location.search + location.hash
    }
  }, [location.pathname, location.search, location.hash])

  return <>{children}</>
}

interface PageIslandProps {
  children: ReactNode
  /** If the component uses useParams(), provide the route pattern (e.g. "/blog/:slug") */
  routePattern?: string
}

/**
 * Wraps a React page component with all necessary providers for Astro.
 *
 * Usage in island files:
 * ```tsx
 * export default function MyPageIsland() {
 *   return (
 *     <PageIsland>
 *       <MyPage />
 *     </PageIsland>
 *   )
 * }
 * ```
 */
export default function PageIsland({ children, routePattern }: PageIslandProps) {
  const content = routePattern ? (
    <Routes>
      <Route path={routePattern} element={<>{children}</>} />
    </Routes>
  ) : (
    children
  )

  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <NavigationBridge>
            {content}
          </NavigationBridge>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  )
}
