import { TMDB_BASE_URL, DEFAULT_DISCOVER_PARAMS, getTodayFormatted } from "../config/tmdbConfig";
import type { Movie } from "../types/Movie";
import type { PaginatedResponse } from "../types/PaginatedResponse";

export const discoverMovies = async (page: number = 1): Promise<PaginatedResponse<Movie>> => {

    const params = new URLSearchParams({
        ...DEFAULT_DISCOVER_PARAMS,
        include_adult: String(DEFAULT_DISCOVER_PARAMS.include_adult),
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
