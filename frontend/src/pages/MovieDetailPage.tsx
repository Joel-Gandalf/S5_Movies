import { useMovieDetail } from "../hooks/useMovieDetail";
import { MovieHero } from "../components/MovieHero";
import { CastList } from "../components/CastList";
import { TrailerEmbed } from "../components/TrailerEmbed";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { NotFoundMessage } from "../components/NotFoundMessage";
import { MOVIE_DETAIL_MAX_CAST } from "../config/tmdbConfig";
import content from "../config/content.json";
import styles from "../styles/MovieDetailPage.module.css";

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

    const cast = movie.credits.cast.slice(0, MOVIE_DETAIL_MAX_CAST);

    return (

        <div className={styles.layout}>
            <MovieHero movie={movie} director={director} />

            <TrailerEmbed trailer={trailer} />

            <div className={styles.castArea}>
                <h2 className={styles.castHeading}>Actores y actrices: </h2>
                <CastList castMembers={cast} />
            </div>
        </div>
    );
}