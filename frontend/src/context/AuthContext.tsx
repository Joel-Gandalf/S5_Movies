import { createContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { mapFirebaseAuthError } from "../utils/mapFirebaseAuthError";
import { registerUser, loginUser, logoutUser } from "../services/authService";
import type { AuthUser } from "../types/AuthUser";
import type { AuthContextValue } from "../types/AuthContextValue";
import type { RequestStatus } from "../types/RequestStatus";
import type { RegisterFormData } from "../types/RegisterFormData";
import type { LoginFormData } from "../types/LoginFormData";
import type { FirebaseAuthErrorLike } from "../utils/mapFirebaseAuthError";


export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
}

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

    const register = async (data: RegisterFormData): Promise<void> => {
        try {
            const registeredUser = await registerUser(data);
            setUser(registeredUser);
        } catch (error) {
            throw new Error(mapFirebaseAuthError(error as FirebaseAuthErrorLike));
        }
    };

    const login = async (data: LoginFormData): Promise<void> => {
        try {
            const loggedInUser = await loginUser(data);
            setUser(loggedInUser);
        } catch (error) {
            throw new Error(mapFirebaseAuthError(error as FirebaseAuthErrorLike));
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await logoutUser();
            setUser(null);
        } catch (error) {
            throw new Error(mapFirebaseAuthError(error as FirebaseAuthErrorLike));
        }
    };

    const value: AuthContextValue = { user, status, register, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}