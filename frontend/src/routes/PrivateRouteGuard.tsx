import { useAuthPlaceholder } from "../hooks/useAuthPlaceholder"
import { Navigate } from "react-router";
import type { ReactNode } from "react";

type PrivateRouteGuardProps = {
    children: ReactNode;
}

export const PrivateRouteGuard = ({children}: PrivateRouteGuardProps) => {
    const {isLoggedIn} = useAuthPlaceholder();

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    return children;
}