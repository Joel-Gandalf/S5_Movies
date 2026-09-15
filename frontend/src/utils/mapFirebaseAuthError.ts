import { FIREBASE_AUTH_ERROR_MESSAGES, DEFAULT_AUTH_ERROR_MESSAGE } from "../config/firebaseAuthErrors";

export type FirebaseAuthErrorLike = {
    code: string;
};

export const mapFirebaseAuthError = (error: FirebaseAuthErrorLike): string => {
    return FIREBASE_AUTH_ERROR_MESSAGES[error.code] ?? DEFAULT_AUTH_ERROR_MESSAGE;
};