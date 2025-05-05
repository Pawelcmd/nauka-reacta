import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {user} = useAuth();
    return user ? children : <Navigate to="/login" replace/>
}

export default ProtectedRoute;