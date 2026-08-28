import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { AccountNav } from "./AccountNav";

export const Layout = () => {

    return (
        <>
        <header>
            <nav>
                <Navbar />
                <AccountNav />
            </nav>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>

        </footer>
        </>
    );
}