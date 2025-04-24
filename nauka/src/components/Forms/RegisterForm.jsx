import { useForm } from "react-hook-form";

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password");

    const onSubmit = async (data) => {
        console.log("Dane formularza:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
            <h1>Rejestracja</h1>

            <div className="flex flex-col">
                <label>Username</label>
                <input
                    autoFocus
                    {...register("username", { required: "Username jest wymagany" })}
                    className={errors.username ? "border-red-500" : "border-gray-500"}
                />
                {errors.username && (
                    <span className="text-red-500">{errors.username.message}</span>
                )}
            </div>

            <div className="flex flex-col">
                <label>E-mail</label>
                <input
                    type="email"
                    {...register("email", { required: "Email jest wymagany" })}
                    className={errors.email ? "border-red-500" : "border-gray-500"}
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </div>

            <div className="flex flex-col">
                <label>Hasło</label>
                <input
                    type="password"
                    {...register("password", {
                        required: "Hasło jest wymagane", 
                        minLength: {
                            value: 12,
                            message: "Hasło musi mieć co najmniej 12 znaków",
                        },
                    })}
                    className={errors.password ? "border-red-500" : "border-gray-500"}
                />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </div>

            <div className="flex flex-col">
                <label>Powtórz Hasło</label>
                <input
                    type="password"
                    {...register("confirmPassword", {
                        required: "Powtórzenie hasła jest wymagane",
                        validate: (value) =>
                            value === password || "Hasła się nie zgadzają",
                    })}
                    className={errors.confirmPassword ? "border-red-500" : "border-gray-500"}
                />
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
            </div>

            <button type="submit" className="btn btn-primary">
                Zarejestruj się
            </button>
        </form>
    );
}