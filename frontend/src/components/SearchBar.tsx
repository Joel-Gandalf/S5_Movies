import { useRef, useState, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { useLocation } from "react-router";
import { SearchInput } from "./SearchInput";
import { useSearchDropdown } from "../hooks/useSearchDropdown";
import { useClickOutside } from "../hooks/useClickOutside";
import { SearchDropdown } from "./SearchDropdown";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import styles from "../styles/SearchBar.module.css";

export const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [isManuallyClosed, setIsManuallyClosed] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const justNavigatedRef = useRef(false);
    const location = useLocation();

    const { movies, people, cast, requestStatus } = useSearchDropdown(query);

    useClickOutside(searchContainerRef, () => setIsManuallyClosed(true));

    useEffect(() => {
        justNavigatedRef.current = true;
        setQuery("");
        setIsManuallyClosed(true);
    }, [location.key]);

    const handleQueryChange = (value: string) => {
        setQuery(value);
        setIsManuallyClosed(false);
    };

    const handleInputFocus = () => {
        if (justNavigatedRef.current) {
            justNavigatedRef.current = false;
            return;
        }
        if (query.trim() !== "") setIsManuallyClosed(false);
    };

    const showDropdown = requestStatus !== 'idle' && !isManuallyClosed;

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const container = searchContainerRef.current;
        if (!container) return;

        const options = Array.from(container.querySelectorAll<HTMLAnchorElement>('[role="option"] a'));
        const currentIndex = options.indexOf(document.activeElement as HTMLAnchorElement);

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (options.length === 0) return;
            const nextIndex = currentIndex === -1 ? 0 : Math.min(currentIndex + 1, options.length - 1);
            options[nextIndex].focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (currentIndex <= 0) {
                container.querySelector<HTMLInputElement>('input')?.focus();
            } else {
                options[currentIndex - 1].focus();
            }
        } else if (event.key === 'Escape') {
            setIsManuallyClosed(true);
            container.querySelector<HTMLInputElement>('input')?.focus();
        }
    };

    return (
        <div ref={searchContainerRef} onKeyDown={handleKeyDown} className={styles.container}>
            <SearchInput
                value={query}
                onChange={handleQueryChange}
                onFocus={handleInputFocus}
            />

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