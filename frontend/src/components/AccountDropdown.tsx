import { useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import { NavLink } from "react-router";
import styles from "../styles/AccountDropdown.module.css";

interface AccountDropdownProps {
    username: string;
    isOpen: boolean;
    onToggle: () => void;
    onLogout: () => void;
}

export const AccountDropdown = ({ username, isOpen, onToggle, onLogout }: AccountDropdownProps) => {
    
    const triggerRef = useRef<HTMLButtonElement>(null);
    const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
    const wasOpenRef = useRef(false);

    useEffect(() => {
        if (isOpen) {
            wasOpenRef.current = true;
            firstMenuItemRef.current?.focus();
        } else if (wasOpenRef.current) {
            wasOpenRef.current = false;
            triggerRef.current?.focus();
        }
    }, [isOpen]);

    const handleMenuKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
        if (event.key === "Escape") {
            onToggle();
        }
    };
    
    return (
        <div className={styles.container}>
            <button
                type="button"
                ref={triggerRef}
                onClick={onToggle}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                className={styles.trigger}
            >
                {username} Mi cuenta
            </button>

            {isOpen && (
                <ul className={styles.menu} role="menu" onKeyDown={handleMenuKeyDown}>
                    <li role="none">
                        <NavLink ref={firstMenuItemRef} to="/account" role="menuitem" className={styles.menuLink}>
                            Mi cuenta
                        </NavLink>
                    </li>
                    <li role="none">
                        <button
                            type="button"
                            role="menuitem"
                            onClick={onLogout}
                            className={styles.menuButton}
                        >
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};