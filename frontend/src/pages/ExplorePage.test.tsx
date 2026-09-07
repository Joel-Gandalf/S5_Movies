import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { ExplorePage } from './ExplorePage';
import * as tmdbServiceModule from '../services/tmdbService';
import type { Movie } from '../types/Movie';
import type { PaginatedResponse } from '../types/PaginatedResponse';

const buildMovie = (overrides: Partial<Movie> = {}): Movie => ({
    id: 1,
    title: 'Película de prueba',
    poster_path: '/poster.jpg',
    vote_average: 7.5,
    release_date: '2024-05-10',
    ...overrides,
});

const buildResponse = (
    results: Movie[],
    overrides: Partial<PaginatedResponse<Movie>> = {}
): PaginatedResponse<Movie> => ({
    page: 1,
    results,
    total_pages: 5,
    total_results: 100,
    ...overrides,
});

const renderExplorePage = () => {
    render(
        <MemoryRouter>
            <ExplorePage />
        </MemoryRouter>
    );
};

describe('ExplorePage (US-03)', () => {

    // Escenario: Carga del listado de películas desde TMDB
    //   Dado que accedo a la sección de Exploración
    //   Cuando la petición a TMDB se resuelve correctamente
    //   Entonces veo un listado con las películas devueltas por la API
    it('shows the movie list when the request succeeds', async () => {
        vi.spyOn(tmdbServiceModule, 'discoverMovies').mockResolvedValueOnce(
            buildResponse([
                buildMovie({ id: 1, title: 'La Odisea' }),
                buildMovie({ id: 2, title: 'Spider-Man' }),
            ])
        );

        renderExplorePage();

        expect(await screen.findByText('La Odisea')).toBeInTheDocument();
        expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    });

    // Escenario: Acceder a la ficha de detalle desde el listado
    //   Dado que estoy viendo el listado de películas
    //   Cuando pulso sobre una película
    //   Entonces navego a la ficha de detalle de esa película con una URL propia
    it('links each movie to its detail page', async () => {
        vi.spyOn(tmdbServiceModule, 'discoverMovies').mockResolvedValueOnce(
            buildResponse([buildMovie({ id: 42, title: 'La Odisea' })])
        );

        renderExplorePage();

        const link = await screen.findByRole('link', { name: /la odisea/i });
        expect(link).toHaveAttribute('href', '/movies/42');
    });

    // Escenario: Avanzar de página con los controles de paginación
    //   Dado que estoy viendo la página 1 del listado
    //   Cuando pulso el botón de "Siguiente"
    //   Entonces se solicita a TMDB la página 2 y se muestran sus resultados
    it('requests the next page when the next button is clicked', async () => {
        const user = userEvent.setup();
        const discoverMoviesSpy = vi.spyOn(tmdbServiceModule, 'discoverMovies');

        discoverMoviesSpy.mockResolvedValueOnce(
            buildResponse([buildMovie({ id: 1, title: 'Película página 1' })], { page: 1 })
        );

        renderExplorePage();

        await screen.findByText('Película página 1');

        discoverMoviesSpy.mockResolvedValueOnce(
            buildResponse([buildMovie({ id: 2, title: 'Película página 2' })], { page: 2 })
        );

        await user.click(screen.getByRole('button', { name: /ir a la siguiente página/i }));

        expect(await screen.findByText('Película página 2')).toBeInTheDocument();
        expect(discoverMoviesSpy).toHaveBeenCalledWith(2);
    });

    // Escenario: Mientras se están cargando los resultados se muestra un indicador de carga
    //   Dado que accedo a la sección de Exploración
    //   Cuando la petición a TMDB todavía no se ha resuelto
    //   Entonces se muestra un indicador de carga
    it('shows a loading indicator while the request is pending', () => {
        vi.spyOn(tmdbServiceModule, 'discoverMovies').mockReturnValue(new Promise(() => {}));

        renderExplorePage();

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    // Escenario: Si la petición falla se muestra un mensaje de error comprensible
    //   Dado que accedo a la sección de Exploración
    //   Cuando la petición a TMDB falla
    //   Entonces se muestra un mensaje de error, sin dejar la pantalla en blanco
    it('shows an error message when the request fails', async () => {
        vi.spyOn(tmdbServiceModule, 'discoverMovies').mockRejectedValueOnce(new Error('Error HTTP: 500'));

        renderExplorePage();

        expect(await screen.findByRole('alert')).toBeInTheDocument();
    });

    // Escenario: Si TMDB no devuelve resultados se muestra un mensaje indicándolo
    //   Dado que accedo a la sección de Exploración
    //   Cuando TMDB devuelve un listado vacío
    //   Entonces se muestra un mensaje indicando que no se han encontrado películas
    it('shows an empty state message when there are no results', async () => {
        vi.spyOn(tmdbServiceModule, 'discoverMovies').mockResolvedValueOnce(buildResponse([]));

        renderExplorePage();

        expect(await screen.findByText('No se han encontrado películas.')).toBeInTheDocument();
    });
});