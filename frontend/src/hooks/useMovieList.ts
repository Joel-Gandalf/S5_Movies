import { useState, useEffect } from "react";
import { discoverMovies } from "../services/tmdbService";
import type { Movie } from "../types/Movie";
import type { RequestStatus } from "../types/RequestStatus";

export const useMovieList = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    useEffect(()=> {
        const resultsManagement = async () => {
            try {
                setRequestStatus('loading');
                const {results, total_pages} = await discoverMovies(currentPage);
                setMovies(results);
                setTotalPages(total_pages);
                setRequestStatus('success');
            } catch (error) {
                setRequestStatus('error');
                 if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        }

        resultsManagement(); 
    }, [currentPage]);

    return {movies, requestStatus, currentPage, totalPages, handlePageChange}
}