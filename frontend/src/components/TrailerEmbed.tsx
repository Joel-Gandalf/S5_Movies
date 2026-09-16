import type { Video } from "../types/Video";
import content from "../config/content.json";
import styles from "../styles/TrailerEmbed.module.css";

interface TrailerEmbedProps {
    trailer: Video | undefined;
}

export const TrailerEmbed = ({ trailer }: TrailerEmbedProps) => {

    if (!trailer) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <iframe
                className={styles.iframe}
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={content.movieDetail.trailerTitle}
                allowFullScreen
            />
        </div>
    );
}