import type { Movie } from "../types/Movie";
import type { Person } from "../types/Person";
import { Link } from "react-router";
import { SearchResultItem } from "./SearchResultItem";
import { SEARCH_MAX_RESULTS_PER_SECTION } from "../config/searchConfig";

type ResultsProps =
    | { type: "movies", movies: Movie[] }
    | { type: "persons", persons: Person[] };

interface SearchResultSectionProps {
    title: string;
    results: ResultsProps;
    link: string;
}

export const SearchResultSection = ({ title, results, link }: SearchResultSectionProps) => {

    if (results.type === "movies") {
        const { movies } = results;
        if (movies.length === 0) {
            return null;
        }
        const moviesResults = movies.slice(0, SEARCH_MAX_RESULTS_PER_SECTION);

        return (
            <section>
                <h2>{title}</h2>
                <ul role="listbox" aria-label={title}>
                    {moviesResults.map(movie =>
                        <li key={movie.id} role="option">
                            <SearchResultItem type="movie" movie={movie} />
                        </li>
                    )}
                </ul>
                {movies.length > SEARCH_MAX_RESULTS_PER_SECTION && <Link to={link} aria-label={`Mostrar todos los resultados de ${title}`}>Mostrar todos los resultados</Link>}
            </section>
        );
    }

    const { persons } = results;
    if (persons.length === 0) {
        return null;
    }
    const personsResults = persons.slice(0, SEARCH_MAX_RESULTS_PER_SECTION);

    return (
        <section>
            <h2>{title}</h2>
            <ul role="listbox" aria-label={title}>
                {personsResults.map(person =>
                    <li key={person.id} role="option">
                        <SearchResultItem type="person" person={person} />
                    </li>
                )}
            </ul>
            {persons.length > SEARCH_MAX_RESULTS_PER_SECTION && <Link to={link} aria-label={`Mostrar todos los resultados de ${title}`}>Mostrar todos los resultados</Link>}
        </section>
    );
}