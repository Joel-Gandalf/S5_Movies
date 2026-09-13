import type { Movie } from "./Movie";

export interface MovieCastCredit extends Movie {
    character: string;
}

export interface MovieCrewCredit extends Movie {
    job: string;
    department: string;
}

export interface PersonMovieCredits {
    cast: MovieCastCredit[];
    crew: MovieCrewCredit[];
}