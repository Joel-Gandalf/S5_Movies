import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { AccountNav } from './AccountNav';
import { PrivateRouteGuard } from '../routes/PrivateRouteGuard';
import { AuthProvider } from '../context/AuthContext';
import * as authServiceModule from '../services/authService';

const { mockOnAuthStateChanged } = vi.hoisted(() => ({
    mockOnAuthStateChanged: vi.fn(),
}));

// Igual que en LoginPage.test.tsx: AuthProvider depende de onAuthStateChanged
// para saber si hay sesión. Aquí simulamos que YA hay una sesión activa,
// porque todos estos escenarios parten de un usuario ya autenticado.
vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(),
    onAuthStateChanged: mockOnAuthStateChanged,
    signOut: vi.fn(),
}));

const loggedInUser = {
    uid: 'uid-123',
    email: 'joel@example.com',
    displayName: 'joel83',
};

const ExploreStub = () => <p>Página de Exploración</p>;
const FavoritesStub = () => <p>Página de Favoritos</p>;
const AccountStub = () => <p>Página de Mi Cuenta</p>;
const LoginStub = () => <p>Página de Login</p>;

const renderAccountNav = (initialEntries: string[] = ['/explore']) => {
    render(
        <MemoryRouter initialEntries={initialEntries}>
            <AuthProvider>
                <AccountNav />
                <Routes>
                    <Route path="/explore" element={<ExploreStub />} />
                    <Route path="/account" element={<AccountStub />} />
                    <Route path="/login" element={<LoginStub />} />
                    <Route
                        path="/favorites"
                        element={
                            <PrivateRouteGuard>
                                <FavoritesStub />
                            </PrivateRouteGuard>
                        }
                    />
                </Routes>
            </AuthProvider>
        </MemoryRouter>
    );
};

describe('AccountNav — desplegable de cuenta y cierre de sesión (US-11)', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        mockOnAuthStateChanged.mockImplementation((_auth, callback) => {
            callback(loggedInUser);
            return () => { };
        });
    });

    // Escenario: Abrir el desplegable
    it('opens the dropdown menu when clicking the trigger button', async () => {
        renderAccountNav();
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', { name: /joel83/i }));

        expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    // Escenario: Ir a Mi cuenta
    it('navigates to the account page when clicking "Mi cuenta" in the dropdown', async () => {
        renderAccountNav();
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', { name: /joel83/i }));
        await user.click(screen.getByRole('menuitem', { name: /mi cuenta/i }));

        expect(await screen.findByText('Página de Mi Cuenta')).toBeInTheDocument();
    });

    // Escenario: Cerrar sesión correctamente + Navegación refleja el cierre
    it('logs the user out and updates the navigation when clicking "Cerrar sesión"', async () => {
        vi.spyOn(authServiceModule, 'logoutUser').mockResolvedValue();
        renderAccountNav();
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', { name: /joel83/i }));
        await user.click(screen.getByRole('menuitem', { name: /cerrar sesión/i }));

        expect(await screen.findByRole('link', { name: /ir a iniciar sesión/i })).toBeInTheDocument();
        expect(screen.queryByText(/joel83/i)).not.toBeInTheDocument();
    });

    // Escenario: Acceso a sección protegida tras cerrar sesión
    it('redirects to login when visiting a protected route after logging out', async () => {
        vi.spyOn(authServiceModule, 'logoutUser').mockResolvedValue();
        renderAccountNav(['/favorites']);
        const user = userEvent.setup();

        expect(await screen.findByText('Página de Favoritos')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: /joel83/i }));
        await user.click(screen.getByRole('menuitem', { name: /cerrar sesión/i }));

        await waitFor(() => {
            expect(screen.queryByText('Página de Favoritos')).not.toBeInTheDocument();
        });
    });

    // Escenario: Datos personales no se pierden
    it('only signs the session out, without calling any account-deleting logic', async () => {
        const logoutSpy = vi.spyOn(authServiceModule, 'logoutUser').mockResolvedValue();
        renderAccountNav();
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', { name: /joel83/i }));
        await user.click(screen.getByRole('menuitem', { name: /cerrar sesión/i }));

        await waitFor(() => {
            expect(logoutSpy).toHaveBeenCalledTimes(1);
        });
        expect(logoutSpy).toHaveBeenCalledWith();
    });

    // Escenario: Cerrar al hacer clic fuera
    it('closes the dropdown when clicking outside of it', async () => {
        renderAccountNav();
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', { name: /joel83/i }));
        expect(screen.getByRole('menu')).toBeInTheDocument();

        // La página de Exploración (fuera del desplegable) actúa aquí de "clic fuera"
        await user.click(screen.getByText('Página de Exploración'));

        await waitFor(() => {
            expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        });
    });
});