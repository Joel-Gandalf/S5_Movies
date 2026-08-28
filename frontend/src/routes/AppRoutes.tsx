import { BrowserRouter, Routes, Route } from 'react-router'
import { Layout } from '../components/Layout'
import { HomePage } from '../pages/HomePage'
import { ExplorePage } from '../pages/ExplorePage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { AccountPage } from '../pages/AccountPage'
import { FavoritesPage } from '../pages/FavoritesPage'
import { NotFound } from '../pages/NotFound'
import { PrivateRouteGuard } from './PrivateRouteGuard'

const MovieDetailPage = () => <p>MovieDetailPage — pendiente (US-06)</p>
const PersonDetailPage = () => <p>PersonDetailPage — pendiente (US-07/US-08)</p>

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/people/:id" element={<PersonDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<PrivateRouteGuard> <AccountPage /> </PrivateRouteGuard>} />
          <Route path="/favorites" element={<PrivateRouteGuard> <FavoritesPage /> </PrivateRouteGuard>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}