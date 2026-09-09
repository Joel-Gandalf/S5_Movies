import type { Person } from "../types/Person";
import { getProfileImageUrl } from "../utils/getProfileImageUrl";
import { Link } from 'react-router';
import styles from "../styles/MovieCard.module.css";

export const PersonCard = ({ person }: { person: Person }) => {

    const profileImageUrl = getProfileImageUrl(person.profile_path);
    const role = person.known_for_department;
    let roleLabel: string;

    if (role === "Acting") {
        roleLabel = "Actor/Actriz";
    } else if (role === "Directing") {
        roleLabel = "Director/a";
    } else {
        roleLabel = "Profesional cinematográfico"
    }
    
    return (

        <Link to={`/people/${person.id}`} className={styles.card}>
            <figure className={styles.figure}>
                <img src={profileImageUrl} alt={`Fotografía de`} className={styles.poster} />
                <figcaption className={styles.caption}>
                    <h3 className={styles.title}>{person.name}</h3>
                    <p>{roleLabel}</p>
                </figcaption>
            </figure>
        </Link>
    );
}