import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HomePage } from './HomePage';

describe('HomePage (US-02)', () => {

    // Escenario: Pantalla de bienvenida al entrar en la aplicación
    // Dado que accedo a la aplicación por primera vez
    // Entonces veo la pantalla de bienvenida con el layout de navegación visible
    it('renders the welcome screen with its main heading', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        const heading = screen.getByRole('heading', {
            level: 1,
            name: /déjate envolver por la magia del cine/i,
        });

        expect(heading).toBeInTheDocument();
    });

    // Escenario: Exploración pública sin autenticación
    // Dado que no he iniciado sesión
    // Cuando accedo a la pantalla de bienvenida
    // Entonces puedo ver su contenido sin necesidad de registrarme
    it('renders its content without requiring authentication', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        const sectionHeadings = screen.getAllByRole('heading', { level: 2 });

        expect(sectionHeadings).toHaveLength(4);
        expect(
            screen.getByRole('heading', { name: /tu rincón para descubrir el cine que te apasiona/i })
        ).toBeInTheDocument();
    });

});