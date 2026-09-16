import { useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { AccountDropdown } from "./AccountDropdown";
import styles from '../styles/AccountNav.module.css';


export const AccountNav = () => {

    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen((prev) => !prev);

    const handleLogout = () => {
        // lógica real de logout posterior
    };

    return (
        <>  
            {user ? (
                <AccountDropdown
                    username={user.displayName ?? ""}
                    isOpen={isOpen}
                    onToggle={handleToggle}
                    onLogout={handleLogout}
                />
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