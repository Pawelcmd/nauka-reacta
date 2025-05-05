import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const yupSchema = yup.object().shape({
    username: yup.string().required("Pole username jest wymagane"),
    email: yup.string().email("Pole email jest wymagane"),
    password: yup
        .string()
        .required("Pole hasło jest wymagane")
        .min(12, "minimum 12 znaków"),
    confirmPassword: yup
        .string()
        .required("Pole hasło jest wymagane")
        .oneOf([yup.ref("password")], "Hasła się nie zgadzają"),
});

export default function RegisterForm() {
    const [apiError, setApiError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(yupSchema),
    });

    const password = watch("password");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setApiError(null);
        setSuccess(null);
        setIsFormSubmitting(true);

        try {
            const response = await axios.post("https://fakestoreapi.com/users", data);

            if (response.status === 200 || response.status === 201) {
                setSuccess(true);
                navigate("/login", { state: { registered: true } });
            } else {
                setApiError("Wystąpił nieoczekiwany błąd.");
            }
        } catch (e) {
            if (e.response?.status === 400) {
                setApiError("Błędne dane rejestracji.");
            } else {
                setApiError("Wystąpił błąd przy rejestracji.");
            }
        } finally {
            setIsFormSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
            <h1>Rejestracja</h1>
            {apiError && <span>{apiError}</span>}
            {success && <span className="text-green-500">Rejestracja zakończona sukcesem!</span>}

            <div className="flex flex-col">
                <label>Username</label>
                <input
                    autoFocus
                    {...register("username")}
                    className={errors.username ? "border-red-500" : "border-gray-500"}
                />
                {errors.username && <span className="text-red-500">{errors.username.message}</span>}
            </div>

            <div className="flex flex-col">
                <label>E-mail</label>
                <input
                    type="email"
                    {...register("email")}
                    className={errors.email ? "border-red-500" : "border-gray-500"}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col">
                <label>Hasło</label>
                <input
                    type="password"
                    {...register("password", {
                        minLength: {
                            value: 12,
                            message: "Hasło musi mieć co najmniej 12 znaków",
                        },
                    })}
                    className={errors.password ? "border-red-500" : "border-gray-500"}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>

            <div className="flex flex-col">
                <label>Powtórz Hasło</label>
                <input
                    type="password"
                    {...register("confirmPassword", {
                        validate: (value) =>
                            value === password || "Hasła się nie zgadzają",
                    })}
                    className={errors.confirmPassword ? "border-red-500" : "border-gray-500"}
                />
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting || isFormSubmitting}>
                Zarejestruj się
            </button>
        </form>
    );
}