import content from "../config/content.json";
import styles from "../styles/ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({message}: ErrorMessageProps) => {

    return (
        <div role="alert" className={styles.wrapper}>
            <p>{message ? message : content.common.genericError}</p>
        </div>
    );
}