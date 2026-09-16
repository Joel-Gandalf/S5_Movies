import { SearchResultSection } from "./SearchResultSection";
import content from "../config/content.json";
import type { SearchResults } from "../types/SearchResults";
import styles from "../styles/SearchDropdown.module.css";

interface SearchDropDownProps {
    results: SearchResults;
    query: string;
}

export const SearchDropdown = ({ results, query }: SearchDropDownProps) => {

    const { movies, people, cast } = results;
    const hasResults = movies.length > 0 || people.length > 0 || cast.length > 0;

    return (
        <div aria-live="polite" className={styles.dropdown}>
            {!hasResults ? (
                <p className={styles.noResults}>{content.search.noResults}</p>
            ) : (
                <>
                    <SearchResultSection
                        title={content.search.sectionTitles.movies}
                        results={{ type: "movies", movies: movies }}
                        link={`/search?q=${encodeURIComponent(query)}&type=movies`}
                    />
                    <SearchResultSection
                        title={content.search.sectionTitles.people}
                        results={{ type: "persons", persons: people }}
                        link={`/search?q=${encodeURIComponent(query)}&type=persons`}
                    />
                    <SearchResultSection
                        title={content.search.sectionTitles.cast}
                        results={{ type: "movies", movies: cast }}
                        link={`/search?q=${encodeURIComponent(query)}&type=cast`}
                    />
                </>
            )}
        </div>
    );
}