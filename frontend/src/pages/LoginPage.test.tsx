import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { LoginPage } from './LoginPage';
import { AccountNav } from '../components/AccountNav';
import { PrivateRouteGuard } from '../routes/PrivateRouteGuard';
import { AuthProvider } from '../context/AuthContext';
import * as authServiceModule from '../services/authService';

const { mockOnAuthStateChanged } = vi.hoisted(() => ({
    mockOnAuthStateChanged: vi.fn(),
}));

// AuthProvider usa onAuthStateChanged de Firebase para saber si hay una sesión
// guardada. Por defecto simula que no hay ninguna (se resetea en cada test en
// el beforeEach); el test de persistencia lo reconfigura para simular que sí.
vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(),
    onAuthStateChanged: mockOnAuthStateChanged,
    signInWithEmailAndPassword: vi.fn(),
}));

const ExploreStub = () => <p>Página de Exploración</p>;
const FavoritesStub = () => <p>Página de Favoritos</p>;

const renderLoginPage = (initialEntries: string[] = ['/login']) => {
    render(
        <MemoryRouter initialEntries={initialEntries}>
            <AuthProvider>
                <AccountNav />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/explore" element={<ExploreStub />} />
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

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText(/correo electrónico/i), 'joel@example.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'secreta123');
};

describe('LoginPage — inicio de sesión (US-10)', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        mockOnAuthStateChanged.mockImplementation((_auth, callback) => {
            callback(null);
            return () => { };
        });
    });

    // Escenario: Login correcto
    it('redirects to Exploración after a successful login', async () => {
        vi.spyOn(authServiceModule, 'loginUser').mockResolvedValue({
            uid: 'uid-123',
            email: 'joel@example.com',
            displayName: 'joel83',
        });
        renderLoginPage();
        const user = userEvent.setup();

        await fillValidForm(user);
        await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(await screen.findByText('Página de Exploración')).toBeInTheDocument();
    });

    // Escenario: La navegación refleja la sesión iniciada
    it('shows the username in AccountNav after a successful login', async () => {
        vi.spyOn(authServiceModule, 'loginUser').mockResolvedValue({
            uid: 'uid-123',
            email: 'joel@example.com',
            displayName: 'joel83',
        });
        renderLoginPage();
        const user = userEvent.setup();

        await fillValidForm(user);
        await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(await screen.findByText(/joel83/i)).toBeInTheDocument();
    });

    // Escenario: Redirección a la sección protegida original
    it('redirects back to the originally requested protected route after login', async () => {
        vi.spyOn(authServiceModule, 'loginUser').mockResolvedValue({
            uid: 'uid-123',
            email: 'joel@example.com',
            displayName: 'joel83',
        });
        renderLoginPage(['/favorites']);
        const user = userEvent.setup();

        await fillValidForm(user);
        await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(await screen.findByText('Página de Favoritos')).toBeInTheDocument();
    });

    // Escenario: Credenciales incorrectas
    it('shows a generic error message when credentials are invalid', async () => {
        vi.spyOn(authServiceModule, 'loginUser').mockRejectedValue({
            code: 'auth/invalid-credential',
        });
        renderLoginPage();
        const user = userEvent.setup();

        await fillValidForm(user);
        await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(await screen.findByRole('alert')).toHaveTextContent(/correo o contraseña incorrectos/i);
    });

    // Escenario: Persistencia de sesión al recargar
    it('keeps the session active on reload without going through LoginPage', () => {
        mockOnAuthStateChanged.mockImplementation((_auth, callback) => {
            callback({
                uid: 'uid-123',
                email: 'joel@example.com',
                displayName: 'joel83',
            });
            return () => { };
        });

        render(
            <MemoryRouter initialEntries={['/explore']}>
                <AuthProvider>
                    <AccountNav />
                </AuthProvider>
            </MemoryRouter>
        );

        expect(screen.getByText(/joel83/i)).toBeInTheDocument();
    });
});