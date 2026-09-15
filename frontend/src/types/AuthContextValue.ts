import type { AuthUser } from "./AuthUser";
import type { RequestStatus } from "./RequestStatus";
import type { RegisterFormData } from "./RegisterFormData";

export interface AuthContextValue {
    user: AuthUser | null;
    status: RequestStatus;
    register: (data: RegisterFormData) => Promise<void>;
}