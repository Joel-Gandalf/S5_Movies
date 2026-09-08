import content from "../config/content.json";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchInput = ({value, onChange}: SearchInputProps) => {
    
    return (
        <div>
            <label aria-label={content.search.placeholder}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={content.search.placeholder}
                />
            </label>
        </div>    
    );
}