import { getPosterUrl } from "../utils/getPosterUrl";
import type { MovieDetail } from "../types/MovieDetail";
import styles from "../styles/MovieHero.module.css";

interface MovieHeroProps {
    movie: MovieDetail;
}

export const MovieHero = ({ movie }: MovieHeroProps) => {
    
    const releaseYear = movie.release_date.slice(0, 4);

    return (
        <section className={styles.hero} aria-labelledby="movie-title">
            <img 
            src={getPosterUrl(movie.poster_path)} 
            alt={`Póster de ${movie.title}`}
            className={styles.poster} 
            />

            <div className={styles.info}>
                <h1 id="movie-title" className={styles.title}>{movie.title}</h1>
                <p className={styles.overview}>{movie.overview}</p>
                <p className={styles.releaseYear}>Año de estreno: {releaseYear}</p>
                <p className={styles.genresLabel}>Géneros: </p>
                <ul className={styles.genres}>
                    {movie.genres.map(genre => (
                        <li key={genre.id} className={styles.genreChip}>
                            <p className={styles.genreName}>{genre.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}