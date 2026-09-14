import type { Movie } from "./Movie";
import type { Genre } from "./Genre";
import type { CastMember } from "./CastMember";
import type { CrewMember } from "./CrewMember";
import type { Video } from "./Video";

export interface MovieDetail extends Movie {
    genres: Genre[];
    credits: { cast: CastMember[], crew: CrewMember[] };
    videos: { results: Video[] };
    overview: string;
}