import { createContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import type { AuthUser } from "../types/AuthUser";
import type { AuthContextValue } from "../types/AuthContextValue";
import type { RequestStatus } from "../types/RequestStatus";
import type { RegisterFormData } from "../types/RegisterFormData";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [status, setStatus] = useState<RequestStatus>("loading");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                });
            } else {
                setUser(null);
            }
            setStatus("success");
        });

        return () => unsubscribe();
    }, []);

    const register = async (_data: RegisterFormData): Promise<void> => {
        throw new Error("register: todavía no implementado");
    };

    const value: AuthContextValue = { user, status, register };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};