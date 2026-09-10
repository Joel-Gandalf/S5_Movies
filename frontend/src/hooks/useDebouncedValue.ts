import { useEffect, useState } from "react";
import { SEARCH_DEBOUNCE_MS } from "../config/searchConfig"

export const useDebouncedValue = (value: string, delay: number = SEARCH_DEBOUNCE_MS): string => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);

    return debouncedValue;
};