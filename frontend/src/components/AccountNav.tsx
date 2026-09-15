import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";
import styles from '../styles/AccountNav.module.css';

export const AccountNav = () => {

    const { user } = useAuth();

    return (
        <>  
            {user ? (
                <div>
                    <NavLink to="/account" aria-label="Ir a mi cuenta" className={styles.accountLink}>
                        {user.displayName} Mi cuenta
                    </NavLink>
                </div >
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