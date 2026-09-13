import content from "../config/content.json";
import styles from "../styles/SearchInput.module.css";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {

    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-label={content.search.ariaLabel}
                placeholder={content.search.placeholder}
                className={styles.input}
            />
        </div>
    );
}