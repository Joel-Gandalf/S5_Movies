import { useMovieDetail } from "../hooks/useMovieDetail";
import { MovieHero } from "../components/MovieHero";
import { CastList } from "../components/CastList";
import { DirectorLink } from "../components/DirectorLink";
import { TrailerEmbed } from "../components/TrailerEmbed";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { NotFoundMessage } from "../components/NotFoundMessage";
import content from "../config/content.json";

export const MovieDetailPage = () => {
    const { movie, requestStatus, director, trailer } = useMovieDetail();

    if (requestStatus === 'loading' || requestStatus === 'idle') {
        return <LoadingSpinner />;
    }

    if (requestStatus === 'not-found') {
        return <NotFoundMessage message={content.movieDetail.notFound} />;
    }

    if (requestStatus === 'error' || !movie) {
        return <ErrorMessage />;
    }

    return (
        <>
            <MovieHero movie={movie} />
            <DirectorLink director={director} />
            <h2>Actores y actrices: </h2>
            <CastList castMembers={movie.credits.cast} />
            <TrailerEmbed trailer={trailer} />
        </>
    );
}