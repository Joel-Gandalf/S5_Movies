import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from '../components/Layout';
import { HomePage } from '../pages/HomePage';
import { ExplorePage } from '../pages/ExplorePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { AccountPage } from '../pages/AccountPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { NotFound } from '../pages/NotFound';
import { MovieDetailPage } from '../pages/MovieDetailPage';
import { PersonDetailPage } from '../pages/PersonDetailPage';
import { SearchFullResultsPage } from '../pages/SearchFullResultsPage';
import { PrivateRouteGuard } from './PrivateRouteGuard';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/search" element={<SearchFullResultsPage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/people/:id" element={<PersonDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<PrivateRouteGuard><AccountPage /></PrivateRouteGuard>} />
          <Route path="/favorites" element={<PrivateRouteGuard><FavoritesPage /></PrivateRouteGuard>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}