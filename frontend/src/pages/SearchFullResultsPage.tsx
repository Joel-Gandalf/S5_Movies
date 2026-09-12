import { useSearchParams } from "react-router";
import { useSearchFullResults } from "../hooks/useSearchFullResults";
import { MovieGrid } from "../components/MovieGrid";
import { PersonGrid } from "../components/PersonGrid";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { EmptyState } from "../components/EmptyState";
import { Pagination } from "../components/Pagination";
import content from "../config/content.json";

export const SearchFullResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") ?? "";
    const type = searchParams.get("type");

    const { movies, people, requestStatus, currentPage, totalPages, handlePageChange } = useSearchFullResults(query, type);

    let title: string;
    let resultsGrid;

    switch (type) {
        case "movies":
            title = content.search.sectionTitles.movies;
            resultsGrid = <MovieGrid movies={movies} />;
            break;
        case "persons":
            title = content.search.sectionTitles.people;
            resultsGrid = <PersonGrid persons={people} />;
            break;
        case "cast":
            title = content.search.sectionTitles.cast;
            resultsGrid = <MovieGrid movies={movies} />;
            break;
        default:
            title = content.search.noResults;
            resultsGrid = null;
    }

    return (
        <section>
            <div>
                <h1>{`${title}: "${query}"`}</h1>
            </div>
            {requestStatus === 'loading' && <LoadingSpinner />}
            {requestStatus === 'error' && <ErrorMessage />}
            {requestStatus === 'success' && ((movies.length > 0 || people.length > 0) ? (
                <>
                    {resultsGrid}
                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange} 
                    />
                </>
            ) : (
                <EmptyState message={content.search.noResults} />
            ))}
        </section>
    );
};