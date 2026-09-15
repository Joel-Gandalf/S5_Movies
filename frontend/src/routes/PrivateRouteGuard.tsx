import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import type { ReactNode } from "react";

type PrivateRouteGuardProps = {
    children: ReactNode;
}

export const PrivateRouteGuard = ({children}: PrivateRouteGuardProps) => {
    const { user, status } = useAuth();

    if (status === "loading") {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}