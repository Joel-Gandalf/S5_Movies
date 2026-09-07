import content from "../config/content.json";
import styles from "../styles/LoadingSpinner.module.css";


export const LoadingSpinner = () => {

    return (

        <div role="status" aria-live="polite" className={styles.wrapper}>
            <span className={styles.spinner} aria-hidden="true"></span>
            <span className={styles.loadingText}>{content.common.loading}</span>
        </div>
    );
}