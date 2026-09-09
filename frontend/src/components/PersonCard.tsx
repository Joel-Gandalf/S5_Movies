import type { Person } from "../types/Person";
import { getProfileImageUrl } from "../utils/getProfileImageUrl";
import { Link } from 'react-router';
import { getPersonRoleLabel } from "../utils/getPersonRoleLabel";
import styles from "../styles/Card.module.css";

export const PersonCard = ({ person }: { person: Person }) => {

    const profileImageUrl = getProfileImageUrl(person.profile_path);
    const roleLabel = getPersonRoleLabel(person.known_for_department);
    
    return (

        <Link to={`/people/${person.id}`} className={styles.card}>
            <figure className={styles.figure}>
                <img src={profileImageUrl} alt="Fotografía de" className={styles.poster} />
                <figcaption className={styles.caption}>
                    <h3 className={styles.title}>{person.name}</h3>
                    <p className={styles.meta}>{roleLabel}</p>
                </figcaption>
            </figure>
        </Link>
    );
}