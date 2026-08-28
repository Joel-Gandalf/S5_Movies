import { NavLink } from "react-router";

export const AccountNav = () => {

    return isLoggedIn ? (
        <div>
            <NavLink to="/account" aria-label="Ir a mi cuenta">
                nombre de usuario + "Mi cuenta"
            </NavLink>
        </div >
    ) : (

        <ul>
            <li>
                <NavLink to="/login" aria-label="Ir a iniciar sesión">Iniciar sesión</NavLink>
            </li>
            <li>
                <NavLink to="/register" aria-label="Ir a registrarse">Registrarse</NavLink>
            </li>
        </ul>
    );
}