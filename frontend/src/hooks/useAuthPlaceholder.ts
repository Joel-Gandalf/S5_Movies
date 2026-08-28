import { useState } from "react";

export const useAuthPlaceholder = (): {isLoggedIn: boolean; userName: string; toggleLogin: () => void } => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userName = 'Joel';

    const toggleLogin = () => {
        setIsLoggedIn(prev => !prev);
    };

    return {isLoggedIn, userName, toggleLogin}
}