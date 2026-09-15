import { Link } from "react-router";
import type { CrewMember } from "../types/CrewMember";
import content from "../config/content.json";
import styles from "../styles/DirectorLink.module.css";

interface DirectorLinkProps {
    director: CrewMember | undefined;
}

export const DirectorLink = ({director}: DirectorLinkProps) => {
    

    if (!director) {
        return <p>{content.movieDetail.notInfo}</p>;
    }

    return(

        <Link to={`/people/${director.id}`} className={styles.link}>
            <p className={styles.label}>Director/a: </p>
            <p className={styles.name}>{director.name}</p>
        </Link>
    );
}