import { useState, useEffect } from "react";
import { searchMovies, searchPeople, getCastSearchResults } from "../services/tmdbService";
import { useDebouncedValue } from "./useDebouncedValue";
import type { Movie } from "../types/Movie";
import type { Person } from "../types/Person";
import type { SearchResults } from "../types/SearchResults";
import type { RequestStatus } from "../types/RequestStatus";

interface SearchResultsAndState extends SearchResults {
    requestStatus: RequestStatus;
}

export const useSearchDropdown = (query: string): SearchResultsAndState => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [people, setPeople] = useState<Person[]>([]);
    const [cast, setCast] = useState<Movie[]>([]);
    const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');

    const debouncedQuery = useDebouncedValue(query);

    useEffect(() => {
        if (debouncedQuery.trim() === "") {
            setMovies([]);
            setPeople([]);
            setCast([]);
            setRequestStatus('idle');
            return;
        }

        let ignore = false;

        const fetchData = async () => {
            try {
                setRequestStatus('loading');

                const [moviesResponse, peopleResponse, castMovies] = await Promise.all([
                    searchMovies(debouncedQuery),
                    searchPeople(debouncedQuery),
                    getCastSearchResults(debouncedQuery),
                ]);

                if (ignore) return;

                setMovies(moviesResponse.results);
                setPeople(peopleResponse.results);
                setCast(castMovies);
                setRequestStatus('success');
            } catch (error) {
                if (ignore) return;

                setRequestStatus('error');
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        };

        fetchData();

        return () => {
            ignore = true;
        };

    }, [debouncedQuery]);

    return { movies, people, cast, requestStatus }
}