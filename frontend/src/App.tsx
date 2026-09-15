import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';

export const App = () => {

    return (
            <AuthProvider>
                <AppRoutes />
            </AuthProvider> 
    );
}
