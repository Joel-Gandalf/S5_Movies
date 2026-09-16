import { useState, useRef } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useClickOutside } from "../hooks/useClickOutside";
import { AccountDropdown } from "./AccountDropdown";
import styles from '../styles/AccountNav.module.css';


export const AccountNav = () => {

    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const accountDropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => setIsOpen((prev) => !prev);

    const handleLogout = () => {
        // lógica real de logout posterior
    };

    useClickOutside(accountDropdownRef, () => setIsOpen(false));

    return (
        <>  
            {user ? (
                <div ref={accountDropdownRef}>
                    <AccountDropdown
                        username={user.displayName ?? ""}
                        isOpen={isOpen}
                        onToggle={handleToggle}
                        onLogout={handleLogout}
                    />
                </div>
            ) : (
                <ul className={styles.list}>
                    <li>
                        <NavLink to="/login" aria-label="Ir a iniciar sesión" className={styles.link}>
                            Iniciar sesión
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" aria-label="Ir a registrarse" className={styles.link}>
                            Registrarse
                        </NavLink>
                    </li>
                </ul>
            )}
        </>
    )
}