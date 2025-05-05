import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Upewnij się, że ścieżka pasuje

export const useAuth = () => {
    return useContext(AuthContext);
};
