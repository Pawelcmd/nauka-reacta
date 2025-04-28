import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/Forms/RegisterForm";
import { useEffect } from "react";

const RegisterPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            navigate("/products");
        }
    }, [navigate]);

    return <RegisterForm />;
};

export default RegisterPage;