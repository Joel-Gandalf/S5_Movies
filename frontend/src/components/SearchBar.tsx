import { useRef, useState } from "react";
import { SearchInput } from "./SearchInput";
import { useSearchDropdown } from "../hooks/useSearchDropdown";
import { useClickOutside } from "../hooks/useClickOutside";
import { SearchDropdown } from "./SearchDropdown";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";

export const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [isManuallyClosed, setIsManuallyClosed] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const { movies, people, cast, requestStatus } = useSearchDropdown(query);

    useClickOutside(searchContainerRef, () => setIsManuallyClosed(true));

    const handleQueryChange = (value: string) => {
        setQuery(value);
        setIsManuallyClosed(false);
    };

    const showDropdown = requestStatus !== 'idle' && !isManuallyClosed;

    return (
        <div ref={searchContainerRef}>
            <SearchInput value={query} onChange={handleQueryChange} />

            {showDropdown && (
                <>
                    {requestStatus === 'loading' && <LoadingSpinner />}
                    {requestStatus === 'error' && <ErrorMessage />}
                    {requestStatus === 'success' && <SearchDropdown query={query} results={{ movies, people, cast }} />}
                </>
            )}
        </div>
    );
} 