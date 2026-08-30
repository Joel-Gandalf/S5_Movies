import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { Layout } from './Layout';
import * as useAuthPlaceholderModule from '../hooks/useAuthPlaceholder';
import { PrivateRouteGuard } from '../routes/PrivateRouteGuard';

// Páginas mínimas para montar el router de pruebas, sin depender de las páginas reales
const HomeStub = () => <p>Home</p>;
const FavoritesStub = () => <p>Favorites</p>;
const LoginStub = () => <p>Login</p>;

// Envoltorio reutilizable: monta Layout con las rutas necesarias para cada test
const renderWithRouter = (initialRoute: string) => {
    render(
        <MemoryRouter initialEntries={[initialRoute]}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomeStub />} />
                    <Route 
                        path="/favorites" 
                        element={
                            <PrivateRouteGuard>
                                <FavoritesStub />
                            </PrivateRouteGuard>
                            } />
                    <Route path="/login" element={<LoginStub />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
};

describe('Layout — navegación (US-01)', () => {
    // Escenario: La navegación es visible en cualquier pantalla
    //   Dado que estoy en cualquier pantalla de la aplicación
    //   Entonces veo la barra de navegación con los enlaces Inicio, Exploración y Favoritos
    it('should show the main navigation links on any screen', () => {
        renderWithRouter('/');

        expect(screen.getByRole('link', { name: /ir a inicio/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /ir a exploración de películas/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /ir a lista de películas favoritas/i })).toBeInTheDocument();
    });

    // Escenario: Marcado de accesibilidad de la sección activa
    //   Dado que estoy en la sección de Exploración
    //   Entonces el enlace "Exploración" tiene el atributo aria-current="page"
    it('should mark the active section link with aria-current', () => {
        renderWithRouter('/');

        const homeLink = screen.getByRole('link', { name: /ir a inicio/i });
        expect(homeLink).toHaveAttribute('aria-current', 'page');
    });

    // Escenario: Navegación accesible por teclado
    //   Dado que estoy navegando la aplicación solo con el teclado
    //   Cuando recorro la barra de navegación con la tecla Tab
    //   Entonces puedo enfocar y activar cada enlace en un orden lógico
    it('should let the user tab through nav links in order', async () => {
        renderWithRouter('/');
        const user = userEvent.setup();

        const logoLink = screen.getByRole('link', { name: /movies factor/i });
        const menuToggle = screen.getByRole('button', { name: /☰/ });
        const homeLink = screen.getByRole('link', { name: /ir a inicio/i });
        const exploreLink = screen.getByRole('link', { name: /ir a exploración de películas/i });

        await user.tab();
        expect(logoLink).toHaveFocus();
        
        await user.tab();
        expect(menuToggle).toHaveFocus();        

        await user.tab();
        expect(homeLink).toHaveFocus();

        await user.tab();
        expect(exploreLink).toHaveFocus();
    });
});

describe('AccountNav — sesión no iniciada (US-01)', () => {
    // Antes de cada test de este bloque, forzamos isLoggedIn: false
    beforeEach(() => {
        vi.spyOn(useAuthPlaceholderModule, 'useAuthPlaceholder').mockReturnValue({
            isLoggedIn: false,
            userName: '',
            toggleLogin: vi.fn(),
        });
    });

    // Escenario: Navegación sin sesión iniciada
    //   Dado que no he iniciado sesión
    //   Entonces veo en la barra de navegación un enlace "Iniciar sesión / Registrarse"
    it('should show login and register links when there is no session', () => {
        renderWithRouter('/');

        expect(screen.getByRole('link', { name: /ir a iniciar sesión/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /ir a registrarse/i })).toBeInTheDocument();
    });

    // Escenario: Acceso a Favoritos sin sesión iniciada
    //   Dado que no he iniciado sesión
    //   Cuando pulso el enlace "Favoritos" en la barra de navegación
    //   Entonces soy redirigida/o al formulario de login
    it('should redirect to login when clicking Favorites without a session', async () => {
        renderWithRouter('/');
        const user = userEvent.setup();

        const favoritesLink = screen.getByRole('link', { name: /ir a lista de películas favoritas/i });
        await user.click(favoritesLink);

        expect(screen.getByText('Login')).toBeInTheDocument();
    });
});

describe('AccountNav — sesión iniciada (US-01)', () => {
    // Antes de cada test de este bloque, forzamos isLoggedIn: true
    beforeEach(() => {
        vi.spyOn(useAuthPlaceholderModule, 'useAuthPlaceholder').mockReturnValue({
            isLoggedIn: true,
            userName: 'Joel',
            toggleLogin: vi.fn(),
        });
    });

    // Escenario: Navegación con sesión iniciada
    //   Dado que he iniciado sesión
    //   Entonces el enlace "Iniciar sesión / Registrarse" se sustituye por mi nombre de usuario y un enlace "Mi cuenta"
    it('should show the username and account link when there is a session', () => {
        renderWithRouter('/');

        expect(screen.getByRole('link', { name: /ir a mi cuenta/i })).toHaveTextContent('Joel');
        expect(screen.queryByRole('link', { name: /ir a iniciar sesión/i })).not.toBeInTheDocument();
    });
});