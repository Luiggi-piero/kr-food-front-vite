import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth";


function AuthRoute({ children }) {

    const location = useLocation();  // guarda la ubicación actual (URL) de la aplicación.
    const { user } = useAuth();
    return user
        ? (children)
        : <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
}

export default AuthRoute