import type { Movie } from "../types/Movie";
import { getPosterUrl } from "../utils/getPosterUrl";
import starFilled from "../assets/icons/estrella-relleno.png";
import { Link } from 'react-router';

export const MovieCard = ({ movie }: { movie: Movie }) => {

    const posterUrl = getPosterUrl(movie.poster_path);
    const yearPublication = movie.release_date.slice(0,4);
    
    return (

        <Link to={`/movies/${movie.id}`}>
            <figure>
                <div>
                    <img src={starFilled} alt="Estrella con valoración:" />
                    <p>{movie.vote_average.toFixed(1)}</p>
                </div>
                <img src={posterUrl} alt={`Poster de la película ${movie.title}`}/>
                <figcaption>
                    <h3>{movie.title}</h3>
                    {(yearPublication !== "") && <p>{`(${yearPublication})`}</p>}
                </figcaption>
            </figure>
        </Link>
    );
}