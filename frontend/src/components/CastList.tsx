import { Link } from "react-router";
import { getProfileImageUrl } from "../utils/getProfileImageUrl";
import type { CastMember } from "../types/CastMember";
import styles from "../styles/CastList.module.css";

interface CastListProps {
    castMembers: CastMember[];
}

export const CastList = ({ castMembers }: CastListProps) => {

    return (
        <ul className={styles.list}>
            {castMembers.map(castMember => (
                <li key={`${castMember.id}`} className={styles.item}>
                    <Link to={`/people/${castMember.id}`} className={styles.link}>
                        <figure className={styles.figure}>
                            <img 
                                className={styles.photo} 
                                src={`${getProfileImageUrl(castMember.profile_path)}`} 
                                alt="Fotografía de" 
                            />
                            <figcaption className={styles.caption}>
                                <p className={styles.name}>{castMember.name}</p>
                            </figcaption>
                        </figure>
                    </Link>
                </li>
            ))}
        </ul>
    );
}