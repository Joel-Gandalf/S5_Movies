import styles from "../styles/ExplorePage.module.css";
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
            <div className={styles.page}>
                <h1 className={styles.title}>Novedades para descubrir</h1>
            </div>
            {requestStatus === 'loading' && <LoadingSpinner />}
            {requestStatus === 'error' && <ErrorMessage />}
            {requestStatus === 'success' && (movies.length > 0 ? (
                <>
                    <MovieGrid movies={movies} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange} />
                </>
            ) : (
                <EmptyState message={content.explore.noMoviesFound} />
            ))}
        </>
    );
}