import type { Video } from "../types/Video";
import content from "../config/content.json";

interface TrailerEmbedProps {
    trailer: Video | undefined;
}

export const TrailerEmbed = ({ trailer }: TrailerEmbedProps) => {

    if (!trailer) {
        return null;
    }

    return (
        <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={content.movieDetail.trailerTitle}
            allowFullScreen
        />
    );
}