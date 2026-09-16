import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import type { RegisterFormData } from "../types/RegisterFormData";
import type { LoginFormData } from "../types/LoginFormData";
import type { AuthUser } from "../types/AuthUser";

export const registerUser = async (data: RegisterFormData): Promise<AuthUser> => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
    );

    await updateProfile(userCredential.user, {
        displayName: data.username,
    });

    return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: data.username,
    }
}

export const loginUser = async (data: LoginFormData): Promise<AuthUser> => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
    );

    return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
    }
}

export const logoutUser = async (): Promise<void> => {
    await signOut(auth);
}