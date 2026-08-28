import { NavLink } from "react-router";
import { useAuthPlaceholder } from "../hooks/useAuthPlaceholder";

export const AccountNav = () => {

    const { isLoggedIn, userName, toggleLogin } = useAuthPlaceholder();

    return (
        <>
            <button onClick={toggleLogin}>Cambiar sesión (debug)</button>
            
            {isLoggedIn ? (
                <div>
                    <NavLink to="/account" aria-label="Ir a mi cuenta">
                        {userName} Mi cuenta
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
            )}
        </>
    )
}