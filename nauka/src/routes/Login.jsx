import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const location = useLocation();
  const fromRegister = location?.state?.fromRegister;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/products");
    }
  }, []);

  return (
    <>
      <LoginForm fromRegister={fromRegister} />
      <div>
        Nie masz konta? <Link to="/register">Zarejestruj się</Link>
      </div>
    </>
  );
};

export default LoginPage;