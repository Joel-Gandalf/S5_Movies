import type { Movie } from "../types/Movie";
import type { Person } from "../types/Person";
import { Link } from 'react-router';
import { getPosterUrl } from "../utils/getPosterUrl";
import { getProfileImageUrl } from "../utils/getProfileImageUrl";
import { SEARCH_POSTER_SIZE, SEARCH_PROFILE_SIZE } from "../config/tmdbConfig";
import { getPersonRoleLabel } from "../utils/getPersonRoleLabel";

type SearchResultItemProps =
    | { type: "movie"; movie: Movie }
    | { type: "person"; person: Person };

export const SearchResultItem = (props: SearchResultItemProps) => {

    if (props.type === "movie") {
        const { movie } = props;
        const posterUrl = getPosterUrl(movie.poster_path, SEARCH_POSTER_SIZE);
        const yearPublication = movie.release_date.slice(0, 4);

        return (
            <Link to={`/movies/${movie.id}`}>
                <figure>
                    <img src={posterUrl} alt="Poster de la película" />
                    <figcaption>
                        <p>{movie.title}</p>
                        <p>{`(${yearPublication})`}</p>
                    </figcaption>
                </figure>
            </Link>
        );
    }
    const { person } = props;
    const profileImageUrl = getProfileImageUrl(person.profile_path, SEARCH_PROFILE_SIZE);
    const roleLabel = getPersonRoleLabel(person.known_for_department);

    return (
        <Link to={`/people/${person.id}`}>
            <figure>
                <img src={profileImageUrl} alt="Fotografía de" />
                <figcaption>
                    <p>{person.name}</p>
                    <p>{roleLabel}</p>
                </figcaption>
            </figure>
        </Link>
    );
}