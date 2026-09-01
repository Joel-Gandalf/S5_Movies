import type { Movie } from "../types/Movie";
import { TMDB_IMAGE_BASE_URL, POSTER_SIZE } from "../config/tmdbConfig";
import noPosterImage from "../assets/icons/no-fotos.png"
import starFilled from "../assets/icons/estrella-relleno.png"
import { Link } from 'react-router'

export const MovieCard = ({ movie }: { movie: Movie }) => {

    const movieUrl = `${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
    const yearPublication = movie.release_date.slice(0,4);
    
    return (

        <Link to={`/movies/${movie.id}`}>
            <figure>
                <div>
                    <img src={starFilled} alt="Estrella con valoración:" />
                    <p>{movie.vote_average.toFixed(1)}</p>
                </div>
                <img src={movie.poster_path ? movieUrl : noPosterImage } alt={`Poster de la película ${movie.title}`}/>
                <figcaption>
                    <h3>{movie.title}</h3>
                    {(yearPublication !== "") && <p>{`(${yearPublication})`}</p>}
                </figcaption>
            </figure>
        </Link>
    );
}