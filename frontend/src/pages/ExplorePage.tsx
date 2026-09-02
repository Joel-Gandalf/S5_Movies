import { useMovieList } from "../hooks/useMovieList";
import { MovieGrid } from "../components/MovieGrid";
import { Pagination } from "../components/Pagination";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { EmptyState } from "../components/EmptyState";
import content from "../config/content.json";

export const ExplorePage = () => {

    const { movies, requestStatus, currentPage, totalPages, handlePageChange } = useMovieList();

    return (
        <>
            <h1>Novedades para descubrir</h1>
            {requestStatus === 'loading' && <LoadingSpinner />}
            {requestStatus === 'error' && <ErrorMessage />}
            {requestStatus === 'success' && (movies.length > 0 ? (
                <>
                    <MovieGrid movies={movies} />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </>
            ) : (
                <EmptyState message={content.explore.noMoviesFound} />
            ))}
        </>
    );
}