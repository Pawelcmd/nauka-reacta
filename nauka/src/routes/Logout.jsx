import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger mt-6 mb-6">
            Wyloguj się
        </button>
    );
};

export default Logout;