import type { AuthUser } from "./AuthUser";
import type { RequestStatus } from "./RequestStatus";
import type { RegisterFormData } from "./RegisterFormData";
import type { LoginFormData } from "./LoginFormData";

export interface AuthContextValue {
    user: AuthUser | null;
    status: RequestStatus;
    register: (data: RegisterFormData) => Promise<void>;
    login: (data: LoginFormData) => Promise<void>;
    logout: () => Promise<void>;
}