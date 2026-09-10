import { useState } from "react";
import { useSearchParams } from "react-router";
import { MovieGrid } from "../components/MovieGrid";
import { PersonGrid } from "../components/PersonGrid";
import { Pagination } from "../components/Pagination";
import type { Movie } from "../types/Movie";
import type { Person } from "../types/Person";
import content from "../config/content.json";

const exampleMovies: Movie[] = [
    { id: 1, title: "Ejemplo de película uno", poster_path: null, release_date: "2020-03-15", vote_average: 7.2 },
    { id: 2, title: "Ejemplo de película dos", poster_path: null, release_date: "2018-11-02", vote_average: 6.5 },
];

const examplePersons: Person[] = [
    { id: 1, name: "Persona de ejemplo uno", profile_path: null, known_for_department: "Acting" },
    { id: 2, name: "Persona de ejemplo dos", profile_path: null, known_for_department: "Directing" },
];

const EXAMPLE_TOTAL_PAGES = 3;

export const SearchFullResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") ?? "";
    const type = searchParams.get("type");

    const [currentPage, setCurrentPage] = useState(1);

    let title: string;
    let resultsGrid;

    switch (type) {
        case "movies":
            title = content.search.sectionTitles.movies;
            resultsGrid = <MovieGrid movies={exampleMovies} />;
            break;
        case "persons":
            title = content.search.sectionTitles.people;
            resultsGrid = <PersonGrid persons={examplePersons} />;
            break;
        case "cast":
            title = content.search.sectionTitles.cast;
            resultsGrid = <MovieGrid movies={exampleMovies} />;
            break;
        default:
            title = content.search.noResults;
            resultsGrid = null;
    }

    return (
        <section>
            <h1>{`${title}: "${query}"`}</h1>
            {resultsGrid}
            <Pagination
                currentPage={currentPage}
                totalPages={EXAMPLE_TOTAL_PAGES}
                onPageChange={setCurrentPage}
            />
        </section>
    );
};