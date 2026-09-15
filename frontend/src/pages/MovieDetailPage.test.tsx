import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { MovieDetailPage } from './MovieDetailPage';
import * as tmdbServiceModule from '../services/tmdbService';
import { MovieNotFoundError } from '../services/tmdbService';
import type { MovieDetail } from '../types/MovieDetail';

const buildMovieDetail = (overrides: Partial<MovieDetail> = {}): MovieDetail => ({
    id: 150,
    title: 'Furia de los Thunderman',
    poster_path: '/poster.jpg',
    vote_average: 7.2,
    release_date: '2026-03-12',
    overview: 'Chloe, la hermana pequeña, desarrolla de repente un poder energético impredecible.',
    genres: [
        { id: 1, name: 'Familia' },
        { id: 2, name: 'Acción' },
    ],
    credits: {
        cast: [
            { id: 1, name: 'Kira Kosarin', character: 'Chloe', profile_path: '/kira.jpg' },
            { id: 2, name: 'Jack Griffo', character: 'Max', profile_path: '/jack.jpg' },
        ],
        crew: [
            { id: 9, name: 'Trevor Kirschner', job: 'Director', profile_path: null },
        ],
    },
    videos: {
        results: [
            { id: 100, key: 'abc123', site: 'YouTube', type: 'Trailer', official: true },
        ],
    },
    ...overrides,
});

const renderMovieDetailPage = (movieId: number | string = 150) => {
    render(
        <MemoryRouter initialEntries={[`/movies/${movieId}`]}>
            <Routes>
                <Route path="/movies/:id" element={<MovieDetailPage />} />
            </Routes>
        </MemoryRouter>
    );
};

describe('MovieDetailPage (US-06)', () => {

    // Escenario: Mientras se está cargando la ficha se muestra un indicador de carga
    //   Dado que accedo a la ficha de detalle de una película
    //   Cuando la petición a TMDB todavía no se ha resuelto
    //   Entonces se muestra un indicador de carga
    it('shows a loading indicator while the request is pending', () => {
        vi.spyOn(tmdbServiceModule, 'getMovieDetail').mockReturnValue(new Promise(() => {}));

        renderMovieDetailPage();

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    // Escenario: Ver la información principal de la película
    //   Dado que accedo a la ficha de detalle de una película
    //   Cuando la petición a TMDB se resuelve correctamente
    //   Entonces veo su título, sinopsis, año de estreno y géneros
    it('shows the movie title, overview, release year and genres', async () => {
        vi.spyOn(tmdbServiceModule, 'getMovieDetail').mockResolvedValueOnce(buildMovieDetail());

        renderMovieDetailPage();

        expect(
            await screen.findByRole('heading', { level: 1, name: 'Furia de los Thunderman' })
        ).toBeInTheDocument();
        expect(screen.getByText(/chloe, la hermana pequeña/i)).toBeInTheDocument();
        expect(screen.getByText('2026')).toBeInTheDocument();
        expect(screen.getByText('Familia')).toBeInTheDocument();
        expect(screen.getByText('Acción')).toBeInTheDocument();
    });

    // Escenario: Acceder a la ficha del director o directora desde la película
    //   Dado que la película tiene un director o directora en sus créditos
    //   Cuando se carga la ficha de detalle
    //   Entonces veo su nombre enlazado a su ficha de persona
    it("links to the director's detail page", async () => {
        vi.spyOn(tmdbServiceModule, 'getMovieDetail').mockResolvedValueOnce(buildMovieDetail());

        renderMovieDetailPage();

        const directorLink = await screen.findByRole('link', { name: /trevor kirschner/i });
        expect(directorLink).toHaveAttribute('href', '/people/9');
    });

    // Escenario: La película no tiene director o directora en sus créditos
    //   Dado que en los créditos no hay nadie con el puesto de "Director"
    //   Cuando se carga la ficha de detalle
    //   Entonces se muestra un mensaje indicando que no hay esa información
    it('shows a fallback message when there is no director', async () => {
        vi.spyOn(tmdbServiceModule, 'getMovieDetail').mockResolvedValueOnce(
            buildMovieDetail({ credits: { cast: [], crew: [] } })
        );

        renderMovieDetailPage();

        expect(await screen.findByText('Sin información')).toBeInTheDocument();
    });

    // Escenario: Ver el reparto principal enlazado a sus fichas de persona
    //   Dado que la película tiene actores y actrices en sus créditos
    //   Cuando se carga la ficha de detalle
    //   Entonces veo su listado con enlaces a sus fichas de persona
    it('lists the main cast with links to their detail pages', async () => {
        vi.spyOn(tmdbServiceModule, 'getMovieDetail').mockResolvedValueOnce(buildMovieDetail());

        renderMovieDetailPage();

        const castLink = await screen.findByRole('link', { name: /kira kosarin/i });
        expect(castLink).toHaveAttribute('href', '/people/1');
        expect(screen.getByRole('link', { name: /jack griffo/i })).toBeInTheDocument();
    });

    // Escenario: El reparto se limita a un número máximo de personas
    //   Dado que la película tiene más actores y actrices de los que se quieren mostrar
    //   Cuando se carga la ficha de detalle
    //   Entonces el listado de reparto solo muestra hasta el máximo configurado
    it('truncates the cast list to the configured maximum', async () => {
        const manyCastMembers = Array.from({ length: 10 }, (_, index) => ({
            id: index + 1,
            name: `Actor ${index + 1}`,
            character: `Personaje ${index + 1}`,
            profile_path: null,
        }));

        vi.spyOn(tmdbServiceModule, 'getMovieDetail').mockResolvedValueOnce(
            buildMovieDetail({ credits: { cast: manyCastMembers, crew: [] } })
        );

        renderMovieDetailPage();

        await screen.findByRole('link', { name: /actor 1/i });

        expect(screen.getAllByRole('link', { name: /actor \d+/i })).toHaveLength(6);
    });

    // Escenario: Ver el tráiler oficial de la película
    //   Dado que la película tiene un tráiler oficial de YouTube en sus vídeos
    //   Cuando se carga la ficha de detalle
    //   Entonces veo el tráiler embebido
    it('shows the official trailer when one is available', async () => {
        vi.spyOn(tmdbServiceModule, 'getMovieDetail').mockResolvedValueOnce(buildMovieDetail());

        renderMovieDetailPage();

        const trailer = await screen.findByTitle('Tráiler de la película');
        expect(trailer).toHaveAttribute('src', 'https://www.youtube.com/embed/abc123');
    });

    // Escenario: La película no tiene tráiler oficial disponible
    //   Dado que la película no tiene ningún vídeo que sea tráiler oficial de YouTube
    //   Cuando se carga la ficha de detalle
    //   Entonces no se muestra ningún reproductor de tráiler
    it('does not render a trailer when there is none', async () => {
        vi.spyOn(tmdbServiceModule, 'getMovieDetail').mockResolvedValueOnce(
            buildMovieDetail({ videos: { results: [] } })
        );

        renderMovieDetailPage();

        await screen.findByRole('heading', { level: 1 });
        expect(screen.queryByTitle('Tráiler de la película')).not.toBeInTheDocument();
    });

    // Escenario: La película solicitada no existe en TMDB
    //   Dado que accedo a la ficha de detalle con un identificador que no existe
    //   Cuando TMDB devuelve un 404
    //   Entonces se muestra un mensaje indicando que la película no se ha encontrado
    it('shows a not-found message when TMDB returns a 404', async () => {
        vi.spyOn(tmdbServiceModule, 'getMovieDetail').mockRejectedValueOnce(
            new MovieNotFoundError('Movie 999 not found')
        );

        renderMovieDetailPage(999);

        expect(await screen.findByText('Película no encontrada')).toBeInTheDocument();
    });

    // Escenario: Si la petición falla se muestra un mensaje de error comprensible
    //   Dado que accedo a la ficha de detalle de una película
    //   Cuando la petición a TMDB falla por un motivo distinto a "no encontrada"
    //   Entonces se muestra un mensaje de error, sin dejar la pantalla en blanco
    it('shows an error message when the request fails', async () => {
        vi.spyOn(tmdbServiceModule, 'getMovieDetail').mockRejectedValueOnce(new Error('Error HTTP: 500'));

        renderMovieDetailPage();

        expect(await screen.findByRole('alert')).toBeInTheDocument();
    });
});