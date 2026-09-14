import { getPosterUrl } from "../utils/getPosterUrl";
import type { MovieDetail } from "../types/MovieDetail";

interface MovieHeroProps {
    movie: MovieDetail;
}

export const MovieHero = ({ movie }: MovieHeroProps) => {
    
    const releaseYear = movie.release_date.slice(0, 4);

    return (
        <section aria-labelledby="movie-title">
            <img src={getPosterUrl(movie.poster_path)} alt={`Póster de ${movie.title}`} />

            <div>
                <h1 id="movie-title">{movie.title}</h1>
                <p>{movie.overview}</p>
                <p>Año de estreno: {releaseYear}</p>
                <p>Géneros: </p>
                <ul>
                    {movie.genres.map(genre => (
                        <li key={genre.id}>
                            <p>{genre.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}