import { Outlet } from "react-router";

export const Layout = () => {

    return (
        <>
        <header>
            <nav>

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