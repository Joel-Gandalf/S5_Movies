import { useState } from 'react';
import { Outlet, Link, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { AccountNav } from "./AccountNav";
import { SearchBar } from './SearchBar';
import styles from '../styles/Layout.module.css';

export const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    }

    return (
        <div className={styles.appShell}>
            <header className={styles.siteHeader}>
                <div className={styles.headerInner}>
                    <Link to="/" className={styles.logoSlot}>
                        MOVIES FACTOR
                    </Link>

                    <div className={`${styles.menuPanel} ${isMenuOpen ? styles.menuPanelOpen : ''}`}>
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
                            className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`}
                        >
                            <div className={styles.primaryNav}>
                                <Navbar />
                            </div>
                            <div className={styles.accountNavWrapper}>
                                <AccountNav />
                            </div>
                        </nav>
                    </div>
                </div>

                {pathname !== '/' && (
                    <div className={styles.searchRow}>
                        <SearchBar />
                    </div>
                )}
            </header>

            <main className={styles.mainContent}>
                <Outlet />
            </main>

            <footer className={styles.siteFooter}>
                <div className={styles.footerInner}></div>
            </footer>
        </div>
    );
}