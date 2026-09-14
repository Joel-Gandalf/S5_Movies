import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getMovieDetail } from "../services/tmdbService";
import { getDirector } from "../utils/getDirector";
import { getOfficialTrailer } from "../utils/getOfficialTrailer";
import type { MovieDetail } from "../types/MovieDetail";
import type { CrewMember } from "../types/CrewMember";
import type { Video } from "../types/Video";
import type { RequestStatus } from "../types/RequestStatus";
import { MovieNotFoundError } from "../services/tmdbService";

export const useMovieDetail = () => {

    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [director, setDirector] = useState<CrewMember | undefined>(undefined);
    const [trailer, setTrailer] = useState<Video | undefined>(undefined);
    const [requestStatus, setRequestStatus] = useState<RequestStatus> ('idle');
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        let ignore = false;

        const resultsFetch = async () => {
            try {
                setRequestStatus('loading');
                const movieDetail = await getMovieDetail(Number(id));
                if (ignore) return;

                setMovie(movieDetail);
                const director = getDirector(movieDetail.credits.crew);
                const trailer = getOfficialTrailer(movieDetail.videos.results);
                setDirector(director);
                setTrailer(trailer);
                setRequestStatus('success');
            } catch (error) {
                if (ignore) return;

                if (error instanceof MovieNotFoundError) {
                    setRequestStatus('not-found')
                    return;
                }

                setRequestStatus('error');
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        }
        resultsFetch()

        return () => {
            ignore = true;
        };
    }, [id]);


    return { movie, requestStatus, director, trailer }
}