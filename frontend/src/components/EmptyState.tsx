import content from "../config/content.json";
import styles from "../styles/EmptyState.module.css";

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({message}: EmptyStateProps) => {

    return (
        <div className={styles.wrapper}>
            <p>{message ? message : content.common.noResults}</p>
        </div>
    );
}