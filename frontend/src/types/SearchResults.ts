import type { Movie } from "./Movie";
import type { Person } from "./Person";

export interface SearchResults {
    movies: Movie[];
    people: Person[];
    cast: Movie[];
}