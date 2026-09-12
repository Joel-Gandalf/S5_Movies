import { useState, useEffect } from "react";
import { searchMovies, searchPeople, getCastSearchResults } from "../services/tmdbService";
import type { Movie } from "../types/Movie";
import type { Person } from "../types/Person";
import type { RequestStatus } from "../types/RequestStatus";
import { SEARCH_MAX_RESULTS_PER_PAGE } from "../config/searchConfig";

export const useSearchFullResults = (query: string, type: string | null) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [people, setPeople] = useState<Person[]>([]);
    const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        let ignore = false;

        const fetchResults = async () => {
            try {
                setRequestStatus('loading');
                switch (type) {
                    case 'movies': {
                        const { results, total_pages } = await searchMovies(query, currentPage);
                        if (ignore) return;
                        setMovies(results);
                        setTotalPages(total_pages);
                        break;
                    }
                    case 'persons': {
                        const { results, total_pages } = await searchPeople(query, currentPage);
                        if (ignore) return;
                        setPeople(results);
                        setTotalPages(total_pages);
                        break;
                    }
                    case 'cast': {
                        const cast = await getCastSearchResults(query);
                        if (ignore) return;
                        const startIndex = (currentPage - 1) * SEARCH_MAX_RESULTS_PER_PAGE;
                        const moviesForPage = cast.slice(startIndex, startIndex + SEARCH_MAX_RESULTS_PER_PAGE);

                        setTotalPages(Math.ceil(cast.length / SEARCH_MAX_RESULTS_PER_PAGE));
                        setMovies(moviesForPage);
                        break;
                    }
                    default:
                        break;
                }
                if (!ignore) setRequestStatus('success');
            } catch (error) {
                if (ignore) return;
                setRequestStatus('error');
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        };

        fetchResults();

        return () => {
            ignore = true;
        };
    }, [query, type, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [query, type]);

    return { movies, people, requestStatus, currentPage, totalPages, handlePageChange };
}