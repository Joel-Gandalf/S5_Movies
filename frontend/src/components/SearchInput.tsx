import content from "../config/content.json";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-label={content.search.ariaLabel}
                placeholder={content.search.placeholder}
            />
        </div>
    );
}