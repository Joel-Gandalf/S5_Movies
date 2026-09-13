import { TMDB_BASE_URL, DEFAULT_DISCOVER_PARAMS, getTodayFormatted, DEFAULT_INCLUDE_ADULT } from "../config/tmdbConfig";
import { SEARCH_MAX_PEOPLE_FOR_CAST_CHAIN } from "../config/searchConfig";
import type { Movie } from "../types/Movie";
import type { Person } from "../types/Person";
import type { PersonMovieCredits } from "../types/PersonMovieCredits";
import type { PaginatedResponse } from "../types/PaginatedResponse";

export const discoverMovies = async (page: number = 1): Promise<PaginatedResponse<Movie>> => {

    const params = new URLSearchParams({
        ...DEFAULT_DISCOVER_PARAMS,
        include_adult: String(DEFAULT_DISCOVER_PARAMS.include_adult),
        'vote_count.gte': String(DEFAULT_DISCOVER_PARAMS["vote_count.gte"]),
        'primary_release_date.lte': getTodayFormatted(),
        page: String(page),
    });

    const response = await fetch(`${TMDB_BASE_URL}/discover/movie?${params}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();

    return result;
}

export const searchMovies = async (query: string, page: number = 1): Promise<PaginatedResponse<Movie>> => {

    const params = new URLSearchParams({
        query,
        include_adult: String(DEFAULT_INCLUDE_ADULT),
        page: String(page),
    });

    const response = await fetch(`${TMDB_BASE_URL}/search/movie?${params}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();

    return result;
}

export const searchPeople = async (query: string, page: number = 1): Promise<PaginatedResponse<Person>> => {

    const params = new URLSearchParams({
        query,
        include_adult: String(DEFAULT_INCLUDE_ADULT),
        page: String(page),
    });

    const response = await fetch(`${TMDB_BASE_URL}/search/person?${params}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();

    return result;
}

export const getPersonMovieCredits = async (personId: number): Promise<PersonMovieCredits> => {

    const response = await fetch(`${TMDB_BASE_URL}/person/${personId}/movie_credits`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();

    return result;
}

export const getCastSearchResults = async (query: string): Promise<Movie[]> => {

    const personsResponse = await searchPeople(query);
    const topPersons = personsResponse.results.slice(0, SEARCH_MAX_PEOPLE_FOR_CAST_CHAIN);
    const creditsPromises = topPersons.map(person => getPersonMovieCredits(person.id));
    const creditsList = await Promise.all(creditsPromises);
    
    const movies = creditsList.flatMap(credit => {
        const directedMovies = credit.crew.filter(crewCredit => crewCredit.job === "Director");
        return [...credit.cast, ...directedMovies];
    });

    const moviesById = new Map<number, Movie>();
    
    movies.forEach(movie => {
        moviesById.set(movie.id, movie);
    });

    const moviesSelected = Array.from(moviesById.values());

    return moviesSelected;
}
