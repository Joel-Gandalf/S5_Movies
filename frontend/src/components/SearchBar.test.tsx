import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, Outlet, useParams } from 'react-router';
import { SearchBar } from './SearchBar';
import * as tmdbServiceModule from '../services/tmdbService';
import type { Movie } from '../types/Movie';
import type { Person } from '../types/Person';

const buildMovie = (overrides: Partial<Movie> = {}): Movie => ({
    id: 1,
    title: 'Jurassic Park',
    poster_path: '/poster.jpg',
    vote_average: 8.1,
    release_date: '1993-06-11',
    ...overrides,
});

const buildPerson = (overrides: Partial<Person> = {}): Person => ({
    id: 1,
    name: 'Steven Spielberg',
    profile_path: '/foto.jpg',
    known_for_department: 'Directing',
    ...overrides,
});

// Stubs de las páginas de destino: solo necesitamos comprobar a dónde navega
// la SearchBar, no repetir el contenido real de esas páginas (ya testeado
// en sus propios archivos .test.tsx).
const ExplorePageStub = () => <p>Página de Exploración</p>;
const MovieDetailStub = () => {
    const { id } = useParams();
    return <p>Detalle de la película {id}</p>;
};
const PersonDetailStub = () => {
    const { id } = useParams();
    return <p>Detalle de la persona {id}</p>;
};
const SearchFullResultsStub = () => <p>Resultados completos de la búsqueda</p>;

// La SearchBar vive en el Layout, fuera de las rutas hijas (US-04): por eso
// aquí también la montamos como elemento de una ruta "padre" con <Outlet />,
// para reproducir que NO se desmonta al navegar entre páginas.
const LayoutStub = () => (
    <>
        <SearchBar />
        <Outlet />
    </>
);

const renderSearchBar = (initialRoute: string = '/exploracion') => {
    render(
        <MemoryRouter initialEntries={[initialRoute]}>
            <Routes>
                <Route element={<LayoutStub />}>
                    <Route path="/exploracion" element={<ExplorePageStub />} />
                    <Route path="/movies/:id" element={<MovieDetailStub />} />
                    <Route path="/people/:id" element={<PersonDetailStub />} />
                    <Route path="/search" element={<SearchFullResultsStub />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
};

const getSearchInput = () => screen.getByRole('textbox', { name: /buscar en el catálogo/i });

describe('SearchBar — desplegable de búsqueda (US-04)', () => {

    // Escenario: Abrir el desplegable de resultados al escribir
    //   Dado que estoy en la sección de Exploración
    //   Cuando escribo "Spielberg" en el campo de búsqueda
    //   Entonces se abre un desplegable con los apartados que tengan coincidencias
    it('opens the dropdown with the matching sections when typing a query', async () => {
        vi.spyOn(tmdbServiceModule, 'searchMovies').mockResolvedValueOnce({
            page: 1, results: [buildMovie({ id: 1, title: 'Duel' })], total_pages: 1, total_results: 1,
        });
        vi.spyOn(tmdbServiceModule, 'searchPeople').mockResolvedValueOnce({
            page: 1, results: [buildPerson({ id: 7, name: 'Steven Spielberg' })], total_pages: 1, total_results: 1,
        });
        vi.spyOn(tmdbServiceModule, 'getCastSearchResults').mockResolvedValueOnce([
            buildMovie({ id: 2, title: 'Jaws' }),
        ]);

        renderSearchBar();
        const user = userEvent.setup();

        await user.click(getSearchInput());
        await user.type(getSearchInput(), 'Spielberg');

        expect(await screen.findByRole('heading', { name: 'Título' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Personas' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Reparto' })).toBeInTheDocument();
    });

    // Escenario: Un apartado sin resultados no se muestra
    //   Dado que busco un texto que solo coincide con películas por título
    //   Entonces el desplegable muestra el apartado "Título"
    //   Y no muestra los apartados "Personas" ni "Reparto"
    it('hides a section when it has no matches', async () => {
        vi.spyOn(tmdbServiceModule, 'searchMovies').mockResolvedValueOnce({
            page: 1, results: [buildMovie({ id: 1, title: 'Duel' })], total_pages: 1, total_results: 1,
        });
        vi.spyOn(tmdbServiceModule, 'searchPeople').mockResolvedValueOnce({
            page: 1, results: [], total_pages: 1, total_results: 0,
        });
        vi.spyOn(tmdbServiceModule, 'getCastSearchResults').mockResolvedValueOnce([]);

        renderSearchBar();
        const user = userEvent.setup();

        await user.click(getSearchInput());
        await user.type(getSearchInput(), 'Duel');

        expect(await screen.findByRole('heading', { name: 'Título' })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'Personas' })).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'Reparto' })).not.toBeInTheDocument();
    });

    // Escenario: Acceder al detalle desde un resultado del desplegable
    //   Dado que el desplegable muestra resultados para mi búsqueda
    //   Cuando pulso sobre un resultado del apartado "Personas"
    //   Entonces navego a la ficha de detalle de esa persona
    it('navigates to the person detail page when clicking a result in "Personas"', async () => {
        vi.spyOn(tmdbServiceModule, 'searchMovies').mockResolvedValueOnce({
            page: 1, results: [], total_pages: 1, total_results: 0,
        });
        vi.spyOn(tmdbServiceModule, 'searchPeople').mockResolvedValueOnce({
            page: 1, results: [buildPerson({ id: 7, name: 'Steven Spielberg' })], total_pages: 1, total_results: 1,
        });
        vi.spyOn(tmdbServiceModule, 'getCastSearchResults').mockResolvedValueOnce([]);

        renderSearchBar();
        const user = userEvent.setup();

        await user.click(getSearchInput());
        await user.type(getSearchInput(), 'Spielberg');

        const personLink = await screen.findByRole('link', { name: /steven spielberg/i });
        await user.click(personLink);

        expect(await screen.findByText('Detalle de la persona 7')).toBeInTheDocument();
    });

    // Escenario: Ver todos los resultados de un apartado
    //   Dado que el apartado "Título" del desplegable muestra un número limitado de resultados
    //   Cuando pulso el enlace "Ver todos" de ese apartado
    //   Entonces accedo a la vista de resultados completa de películas para mi búsqueda
    it('navigates to the full results view when clicking "Mostrar todos"', async () => {
        const manyMovies = Array.from({ length: 7 }, (_, index) =>
            buildMovie({ id: index + 1, title: `Película ${index + 1}` })
        );

        vi.spyOn(tmdbServiceModule, 'searchMovies').mockResolvedValueOnce({
            page: 1, results: manyMovies, total_pages: 1, total_results: manyMovies.length,
        });
        vi.spyOn(tmdbServiceModule, 'searchPeople').mockResolvedValueOnce({
            page: 1, results: [], total_pages: 1, total_results: 0,
        });
        vi.spyOn(tmdbServiceModule, 'getCastSearchResults').mockResolvedValueOnce([]);

        renderSearchBar();
        const user = userEvent.setup();

        await user.click(getSearchInput());
        await user.type(getSearchInput(), 'Película');

        const viewAllLink = await screen.findByRole('link', { name: /mostrar todos los resultados de título/i });
        await user.click(viewAllLink);

        expect(await screen.findByText('Resultados completos de la búsqueda')).toBeInTheDocument();
    });

    // Escenario: Cerrar el desplegable al hacer clic fuera
    //   Dado que el desplegable de resultados está abierto
    //   Cuando hago clic fuera del campo de búsqueda y del desplegable
    //   Entonces el desplegable se cierra
    it('closes the dropdown when clicking outside', async () => {
        vi.spyOn(tmdbServiceModule, 'searchMovies').mockResolvedValueOnce({
            page: 1, results: [buildMovie({ id: 1, title: 'Duel' })], total_pages: 1, total_results: 1,
        });
        vi.spyOn(tmdbServiceModule, 'searchPeople').mockResolvedValueOnce({
            page: 1, results: [], total_pages: 1, total_results: 0,
        });
        vi.spyOn(tmdbServiceModule, 'getCastSearchResults').mockResolvedValueOnce([]);

        renderSearchBar();
        const user = userEvent.setup();

        await user.click(getSearchInput());
        await user.type(getSearchInput(), 'Duel');

        expect(await screen.findByRole('link', { name: /duel/i })).toBeInTheDocument();

        // La página de Exploración (fuera de la barra y del desplegable) actúa
        // aquí de "clic fuera".
        await user.click(screen.getByText('Página de Exploración'));

        await waitFor(() => {
            expect(screen.queryByRole('link', { name: /duel/i })).not.toBeInTheDocument();
        });
    });

    // Escenario: Vaciar el campo de búsqueda cierra el desplegable
    //   Dado que el desplegable de resultados está abierto
    //   Cuando vacío el campo de búsqueda
    //   Entonces el desplegable se cierra y vuelvo a ver el listado general paginado
    it('closes the dropdown when the search field is cleared', async () => {
        vi.spyOn(tmdbServiceModule, 'searchMovies').mockResolvedValueOnce({
            page: 1, results: [buildMovie({ id: 1, title: 'Duel' })], total_pages: 1, total_results: 1,
        });
        vi.spyOn(tmdbServiceModule, 'searchPeople').mockResolvedValueOnce({
            page: 1, results: [], total_pages: 1, total_results: 0,
        });
        vi.spyOn(tmdbServiceModule, 'getCastSearchResults').mockResolvedValueOnce([]);

        renderSearchBar();
        const user = userEvent.setup();

        await user.click(getSearchInput());
        await user.type(getSearchInput(), 'Duel');

        expect(await screen.findByRole('link', { name: /duel/i })).toBeInTheDocument();

        await user.clear(getSearchInput());

        await waitFor(() => {
            expect(screen.queryByRole('link', { name: /duel/i })).not.toBeInTheDocument();
        });
    });

    // Escenario: Búsqueda sin ningún resultado
    //   Dado que busco un texto que no coincide con ninguna película, persona o reparto
    //   Entonces el desplegable muestra un único mensaje indicando que no se han encontrado resultados
    it('shows a single "no results" message when nothing matches', async () => {
        vi.spyOn(tmdbServiceModule, 'searchMovies').mockResolvedValueOnce({
            page: 1, results: [], total_pages: 1, total_results: 0,
        });
        vi.spyOn(tmdbServiceModule, 'searchPeople').mockResolvedValueOnce({
            page: 1, results: [], total_pages: 1, total_results: 0,
        });
        vi.spyOn(tmdbServiceModule, 'getCastSearchResults').mockResolvedValueOnce([]);

        renderSearchBar();
        const user = userEvent.setup();

        await user.click(getSearchInput());
        await user.type(getSearchInput(), 'xyzxyzxyz');

        expect(
            await screen.findByText('No se han encontrado resultados para tu búsqueda.')
        ).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'Título' })).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'Personas' })).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'Reparto' })).not.toBeInTheDocument();
    });
});