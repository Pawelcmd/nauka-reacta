import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const yupSchema = yup.object().shape({
    username: yup.string().required("Pole username jest wymagane"),
    password: yup.string().required("Pole hasło jest wymagane")
})

export default function LoginForm() {
    const location = useLocation();
    const registered = location.state?.registered;
    const [apiError, setApiError] = useState(null);
    const [succes, setSuccess] = useState(null);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const rememberedUsername = localStorage.getItem("rememberedUsername") || "";
    const rememberedPassword = localStorage.getItem("rememberedPassword") || "";

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(yupSchema),
        defaultValues: {
            username: rememberedUsername,
            password: rememberedPassword,
            remember: rememberedUsername && rememberedPassword ? true : false
        }
    });

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        setApiError(null);
        setSuccess(null);
        setIsFormSubmitting(true);
        try {
            const response = await axios.post("https://fakestoreapi.com/auth/login", data)
            if (response.data?.token) {
                setSuccess(true);
                localStorage.setItem("authToken", response.data.token);
            
                if (data.remember) {
                    localStorage.setItem("rememberedUsername", data.username);
                    localStorage.setItem("rememberedPassword", data.password);
                } else {
                    localStorage.removeItem("rememberedUsername");
                    localStorage.removeItem("rememberedPassword");
                }
            
                navigate('/products');
            }
            
            setIsFormSubmitting(false)
        } catch (e) {
            if (e.status === 401) {
                setApiError(
                    "dane logowania są niepoprawne"
                )
            } else {
                setApiError("wystąpił błąd")
            }
            setIsFormSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
            <h1>Logowanie</h1>
            {registered && <span className="text-green-500">Rejestracja zakończona pomyślnie!</span>}<br/>
            {apiError && <span>{apiError}</span>}
            {succes && <span>Sukces</span>}
            <div className="flex flex-col">
                <label>Username</label>
                <input
                    autoFocus
                    {...register("username")}
                    className={errors.username ? "border-red-500" : "border-gray-500"}
                />
                {errors.username && (
                    <span className="text-red-500">{errors.username.message} </span>
                )}
            </div>
            <div className="flex flex-col">
                <label>Hasło</label>
                <input
                    type="password"
                    {...register("password")}
                    className={errors.password ? "border-red-500" : "border-gray-500"}
                />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message} </span>
                )}
            </div>
            <div className="flex items-center">
                <input type="checkbox" id="remember" {...register("remember")} />
                <label htmlFor="remember" className="ml-2">Zapamiętaj mnie</label>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting || isFormSubmitting}>Zaloguj się</button>
        </form>
    )
}