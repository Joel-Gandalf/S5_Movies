import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import type { ReactNode } from "react";

type PrivateRouteGuardProps = {
    children: ReactNode;
}

export const PrivateRouteGuard = ({children}: PrivateRouteGuardProps) => {
    const { user, status } = useAuth();
    const location = useLocation();

    if (status === "loading") {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}