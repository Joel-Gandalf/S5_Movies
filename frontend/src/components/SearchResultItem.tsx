import type { Movie } from "../types/Movie";
import type { Person } from "../types/Person";
import { Link } from 'react-router';

type SearchResultItemProps =
    | { type: "movie"; movie: Movie }
    | { type: "person"; person: Person };

export const SearchResultItem = (props: SearchResultItemProps) => {

    if (props.type === "movie") {
        const { movie } = props;
        const yearPublication = movie.release_date.slice(0, 4);

        return (
            <Link to={`/movies/${movie.id}`}>
                <figure>
                    <img src="" alt="Poster de la película" />
                    <div>
                        <p>{movie.title}</p>
                        <p>{`(${yearPublication})`}</p>
                    </div>
                </figure>
            </Link>
        );
    }
    const { person } = props;
    const role = person.known_for_department;
    let roleLabel: string;

    if (role === "Acting") {
        roleLabel = "Actor/Actriz";
    } else if (role === "Directing") {
        roleLabel = "Director/a";
    } else {
        roleLabel = "Profesional cinematográfico"
    }

    return (
        <Link to={`/people/${person.id}`}>
            <figure>
                <img src="" alt="Fotografía de" />
                <div>
                    <p>{person.name}</p>
                    <p>{roleLabel}</p>
                </div>
            </figure>
        </Link>
    );
}