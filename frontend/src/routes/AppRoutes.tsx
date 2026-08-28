import { BrowserRouter, Routes, Route } from 'react-router'


const Home = () => <p>Home — pendiente (US-02)</p>
const Explore = () => <p>Explore — pendiente (US-03)</p>
const MovieDetailPage = () => <p>MovieDetailPage — pendiente (US-06)</p>
const PersonDetailPage = () => <p>PersonDetailPage — pendiente (US-07/US-08)</p>
const LoginPage = () => <p>LoginPage — pendiente (US-10)</p>
const RegisterPage = () => <p>RegisterPage — pendiente (US-09)</p>
const AccountPage = () => <p>AccountPage — pendiente (US-12)</p>
const FavoritesPage = () => <p>FavoritesPage — pendiente (US-15)</p>
const NotFound = () => <p>Página no encontrada</p>

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/people/:id" element={<PersonDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFound />} />
       
      </Routes>
    </BrowserRouter>
  )
}