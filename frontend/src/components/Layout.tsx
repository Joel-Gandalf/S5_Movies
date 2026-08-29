import { useState } from 'react';
import { Outlet, Link } from "react-router";
import { Navbar } from "./Navbar";
import { AccountNav } from "./AccountNav";
import styles from '../styles/Layout.module.css';

export const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    }

    return (
        <>
            <header className={styles.siteHeader}>
                <div className={styles.headerInner}>
                    <Link to="/" className={styles.logoSlot}>
                        MOVIES FACTOR
                    </Link>

                    <button
                        type="button"
                        className={styles.menuToggle}
                        aria-expanded={isMenuOpen}
                        aria-controls="main-nav-group"
                        onClick={toggleMenu}
                    >
                        ☰
                    </button>
                    
                    <nav
                        id="main-nav-group"
                        aria-label="Navegación principal"
                        className={`${styles.navGroup} ${isMenuOpen ? styles.navGroupOpen : ''}`}
                    >
                        <div className={styles.primaryNav}>
                            <Navbar />
                        </div>
                        <div className={styles.accountNavWrapper}>
                            <AccountNav />
                        </div>
                    </nav>
                </div>
            </header>

            <main className={styles.mainContent}>
                <Outlet />
            </main>

            <footer className={styles.siteFooter}>
                <div className={styles.footerInner}></div>
            </footer>
        </>
    );
}