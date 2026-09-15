import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebaseConfig";
import type { RegisterFormData } from "../types/RegisterFormData";
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
    };
};