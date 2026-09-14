import content from "../config/content.json";
import styles from "../styles/ErrorMessage.module.css";

interface NotFoundMessageProps {
  message?: string;
}

export const NotFoundMessage = ({message}: NotFoundMessageProps) => {

    return (
        <div className={styles.wrapper}>
            <p>{message ? message : content.common.noResults}</p>
        </div>
    );
}