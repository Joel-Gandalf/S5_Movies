import { navLinkItems } from "../config/navLinkItems";
import { NavLink } from "react-router";
import styles from '../styles/Navbar.module.css';

export const Navbar = () => {

    return (
        <ul className={styles.list}>
            {navLinkItems.map(link => (
                <li key={link.id}>
                    <NavLink to={link.path} aria-label={link.ariaLabel} className={styles.link}>
                        {link.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}