import { navLinkItems } from "../config/navLinkItems";
import { NavLink } from "react-router";

export const Navbar = () => {

    return (
        <ul>
            {navLinkItems.map(link => (
                <li key={link.id}>
                    <NavLink to={link.path} aria-label={link.ariaLabel}>
                        {link.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}