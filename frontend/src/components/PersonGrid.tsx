import type { Person } from "../types/Person";
import { PersonCard } from "./PersonCard"; 
import styles from "../styles/Grid.module.css";

interface PersonGridProps {
    persons: Person[];
}

export const PersonGrid = ({persons}: PersonGridProps) => {

    return (
        <section aria-label="Galería de personas seleccionadas">
            <ul className={styles.grid}>
                {persons.map(person => (
                    <li key={person.id}>
                        <PersonCard person={person} />
                    </li>
                ))}
            </ul>
        </section>
    );
}