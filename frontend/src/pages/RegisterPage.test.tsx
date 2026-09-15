import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { RegisterPage } from './RegisterPage';
import { AccountNav } from '../components/AccountNav';
import { AuthProvider } from '../context/AuthContext';
import * as authServiceModule from '../services/authService';

// AuthProvider usa onAuthStateChanged de Firebase para saber si hay una sesión
// guardada. En los tests no hay Firebase real ni almacenamiento del navegador,
// así que la sustituimos: simula que no hay ninguna sesión guardada, para que
// AuthProvider pueda montarse igual que en la aplicación real.
vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(),
    onAuthStateChanged: (_auth: unknown, callback: (user: null) => void) => {
        callback(null);
        return () => { };
    },
    createUserWithEmailAndPassword: vi.fn(),
    updateProfile: vi.fn(),
}));

const ExploreStub = () => <p>Página de Exploración</p>;

const renderRegisterPage = () => {
    render(
        <MemoryRouter initialEntries={['/register']}>
            <AuthProvider>
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/explore" element={<ExploreStub />} />
                </Routes>
            </AuthProvider>
        </MemoryRouter>
    );
};

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText(/nombre de usuario/i), 'joel83');
    await user.type(screen.getByLabelText(/correo electrónico/i), 'joel@example.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'secreta123');
};

describe('RegisterPage — validación de campos (US-09)', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    // Escenario: Nombre de usuario vacío
    //   Dado que dejo vacío el campo "Nombre de usuario"
    //   Cuando intento enviar el formulario
    //   Entonces veo un mensaje indicando que el nombre de usuario es obligatorio
    //   Y no se llama al registro
    it('shows a required error when username is empty', async () => {
        const registerUserSpy = vi.spyOn(authServiceModule, 'registerUser');
        renderRegisterPage();
        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/correo electrónico/i), 'joel@example.com');
        await user.type(screen.getByLabelText(/contraseña/i), 'secreta123');
        await user.click(screen.getByRole('button', { name: /registrarse/i }));

        expect(await screen.findByText('El nombre de usuario es obligatorio')).toBeInTheDocument();
        expect(registerUserSpy).not.toHaveBeenCalled();
    });

    // Escenario: Correo electrónico con formato inválido
    //   Dado que escribo un correo electrónico sin formato válido
    //   Cuando intento enviar el formulario
    //   Entonces veo un mensaje indicando que el formato del correo no es válido
    //   Y no se llama al registro
    it('shows a format error for an invalid email', async () => {
        const registerUserSpy = vi.spyOn(authServiceModule, 'registerUser');
        renderRegisterPage();
        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/nombre de usuario/i), 'joel83');
        await user.type(screen.getByLabelText(/correo electrónico/i), 'correo-no-valido');
        await user.type(screen.getByLabelText(/contraseña/i), 'secreta123');
        await user.click(screen.getByRole('button', { name: /registrarse/i }));

        expect(
            await screen.findByText('El formato del correo no es válido', {}, { timeout: 3000 })
        ).toBeInTheDocument();
        expect(registerUserSpy).not.toHaveBeenCalled();
    });
});

describe('RegisterPage — registro con Firebase (US-09)', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    // Escenario: Registro correcto
    //   Dado que relleno el formulario con datos válidos
    //   Cuando envío el formulario
    //   Entonces se crea la cuenta y soy redirigida/o a la sección de Exploración
    it('redirects to Exploración after a successful registration', async () => {
        vi.spyOn(authServiceModule, 'registerUser').mockResolvedValueOnce({
            uid: 'abc123',
            email: 'joel@example.com',
            displayName: 'joel83',
        });

        renderRegisterPage();
        const user = userEvent.setup();

        await fillValidForm(user);
        await user.click(screen.getByRole('button', { name: /registrarse/i }));

        expect(await screen.findByText('Página de Exploración')).toBeInTheDocument();
    });

    // Escenario: Correo electrónico ya registrado
    //   Dado que relleno el formulario con un correo que ya existe en el sistema
    //   Cuando envío el formulario
    //   Entonces veo un mensaje indicando que ese correo ya está registrado
    //   Y permanezco en el formulario de registro
    it('shows an error message when the email is already registered', async () => {
        vi.spyOn(authServiceModule, 'registerUser').mockRejectedValueOnce({
            code: 'auth/email-already-in-use',
        });

        renderRegisterPage();
        const user = userEvent.setup();

        await fillValidForm(user);
        await user.click(screen.getByRole('button', { name: /registrarse/i }));

        expect(
            await screen.findByText('Ese correo electrónico ya está registrado.')
        ).toBeInTheDocument();
        expect(screen.queryByText('Página de Exploración')).not.toBeInTheDocument();
    });

    // Escenario: Contraseña que no cumple los requisitos mínimos
    //   Dado que relleno el formulario con una contraseña que Firebase rechaza
    //   Cuando envío el formulario
    //   Entonces veo un mensaje indicando que la contraseña no cumple los requisitos
    it('shows an error message when Firebase rejects a weak password', async () => {
        vi.spyOn(authServiceModule, 'registerUser').mockRejectedValueOnce({
            code: 'auth/password-does-not-meet-requirements',
        });

        renderRegisterPage();
        const user = userEvent.setup();

        await fillValidForm(user);
        await user.click(screen.getByRole('button', { name: /registrarse/i }));

        expect(
            await screen.findByText('La contraseña no cumple los requisitos mínimos de seguridad.')
        ).toBeInTheDocument();
    });
});

describe('RegisterPage + AccountNav — sesión tras registro (US-09)', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    // Escenario: Nombre de usuario visible tras el registro
    //   Dado que me acabo de registrar correctamente
    //   Entonces la barra de navegación muestra mi nombre de usuario junto a "Mi cuenta"
    it('shows the username in AccountNav after a successful registration', async () => {
        vi.spyOn(authServiceModule, 'registerUser').mockResolvedValueOnce({
            uid: 'abc123',
            email: 'joel@example.com',
            displayName: 'joel83',
        });

        render(
            <MemoryRouter initialEntries={['/register']}>
                <AuthProvider>
                    <AccountNav />
                    <Routes>
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/explore" element={<ExploreStub />} />
                    </Routes>
                </AuthProvider>
            </MemoryRouter>
        );
        const user = userEvent.setup();

        await fillValidForm(user);
        await user.click(screen.getByRole('button', { name: /registrarse/i }));

        expect(await screen.findByRole('link', { name: /ir a mi cuenta/i })).toHaveTextContent('joel83');
    });
});