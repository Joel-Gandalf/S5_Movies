import type { Movie } from "../types/Movie";
import type { Person } from "../types/Person";
import { Link } from "react-router";
import { SearchResultItem } from "./SearchResultItem";
import { SEARCH_MAX_RESULTS_PER_SECTION } from "../config/searchConfig";
import styles from "../styles/SearchResultSection.module.css";

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
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    {movies.length > SEARCH_MAX_RESULTS_PER_SECTION && <Link
                        to={link}
                        aria-label={`Mostrar todos los resultados de ${title}`}
                        className={styles.viewAll}
                    >Mostrar todos
                    </Link>}
                </div>
                <ul role="listbox" aria-label={title} className={styles.list}>
                    {moviesResults.map(movie =>
                        <li key={movie.id} role="option">
                            <SearchResultItem type="movie" movie={movie} />
                        </li>
                    )}
                </ul>
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
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {persons.length > SEARCH_MAX_RESULTS_PER_SECTION && <Link
                    to={link}
                    aria-label={`Mostrar todos los resultados de ${title}`}
                    className={styles.viewAll}
                >Mostrar todos
                </Link>}
            </div>
            <ul role="listbox" aria-label={title} className={styles.list}>
                {personsResults.map(person =>
                    <li key={person.id} role="option">
                        <SearchResultItem type="person" person={person} />
                    </li>
                )}
            </ul>
        </section>
    );
}