import { getPosterUrl } from "../utils/getPosterUrl";
import { DirectorLink } from "./DirectorLink";
import type { MovieDetail } from "../types/MovieDetail";
import type { CrewMember } from "../types/CrewMember";
import styles from "../styles/MovieHero.module.css";

interface MovieHeroProps {
    movie: MovieDetail;
    director: CrewMember | undefined;
}

export const MovieHero = ({ movie, director }: MovieHeroProps) => {
    
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

                <div className={styles.releaseRow}>
                    <p className={styles.releaseLabel}>Año de estreno: </p>
                    <p className={styles.releaseYear}>{releaseYear}</p>
                </div>

                <div className={styles.genresRow}>
                    <p className={styles.genresLabel}>Géneros: </p>
                    <ul className={styles.genres}>
                        {movie.genres.map(genre => (
                            <li key={genre.id} className={styles.genreChip}>
                                <p className={styles.genreName}>{genre.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <DirectorLink director={director} />
            </div>
        </section>
    );
}