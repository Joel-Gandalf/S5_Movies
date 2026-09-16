import { NavLink } from "react-router";
import styles from "../styles/AccountDropdown.module.css";

interface AccountDropdownProps {
    username: string;
    isOpen: boolean;
    onToggle: () => void;
    onLogout: () => void;
}

export const AccountDropdown = ({ username, isOpen, onToggle, onLogout }: AccountDropdownProps) => {
    return (
        <div className={styles.container}>
            <button
                type="button"
                onClick={onToggle}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                className={styles.trigger}
            >
                {username} Mi cuenta
            </button>

            {isOpen && (
                <ul className={styles.menu} role="menu">
                    <li role="none">
                        <NavLink to="/account" role="menuitem" className={styles.menuLink}>
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