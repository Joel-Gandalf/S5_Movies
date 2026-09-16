import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useClickOutside } from "../hooks/useClickOutside";
import { AccountDropdown } from "./AccountDropdown";
import styles from '../styles/AccountNav.module.css';


export const AccountNav = () => {

    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const accountDropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleToggle = () => setIsOpen((prev) => !prev);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error(error);
        } finally {
            setIsOpen(false);
        }
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