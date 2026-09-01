import { mockMovies } from "./mockMovies";
import { MovieGrid } from "../components/MovieGrid";
import { Pagination } from "../components/Pagination";

export const ExplorePage = () => {

    const handlePageChange = () => {

    } 

    return (
        <>
            <h1>Novedades para descubrir</h1>
            <MovieGrid movies={mockMovies} />
            <Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />
        </>
    );
}