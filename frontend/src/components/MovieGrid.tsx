import type { Movie } from "../types/Movie";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
    movies: Movie[];
}

export const MovieGrid = ({movies}: MovieGridProps) => {

    return (
        <section aria-label="Galería de películas seleccionadas">
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <MovieCard movie={movie} />
                    </li>
                ))}
            </ul>
        </section>
    );
}