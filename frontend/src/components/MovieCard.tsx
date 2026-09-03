import type { Movie } from "../types/Movie";
import { getPosterUrl } from "../utils/getPosterUrl";
import starFilled from "../assets/icons/estrella-relleno.png";
import { Link } from 'react-router';
import styles from "../styles/MovieCard.module.css";

export const MovieCard = ({ movie }: { movie: Movie }) => {

    const posterUrl = getPosterUrl(movie.poster_path);
    const yearPublication = movie.release_date.slice(0,4);
    
    return (

        <Link to={`/movies/${movie.id}`} className={styles.card}>
            <figure className={styles.figure}>
                <img src={posterUrl} alt={`Poster de la película ${movie.title}`} className={styles.poster} />
                <div className={styles.rating}>
                    <img src={starFilled} alt="Estrella con valoración:" className={styles.star} />
                    <p className={styles.ratingValue}>{movie.vote_average.toFixed(1)}</p>
                </div>
                <figcaption className={styles.caption}>
                    <h3 className={styles.title}>{movie.title}</h3>
                    {(yearPublication !== "") && <p className={styles.year}>{`(${yearPublication})`}</p>}
                </figcaption>
            </figure>
        </Link>
    );
}