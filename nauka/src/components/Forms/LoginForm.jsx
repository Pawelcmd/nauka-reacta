import {useForm} from "react-hook-form"

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = async ( data ) => {
        console.log("Dane formularza:", data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
            <h1>Logowanie</h1>
            <div className="flex flex-col">
                <label>Username</label>
                <input
                autoFocus
                {...register("username", {required: "Username jest wymagany"})}
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
                {...register("password", {required: "Hasło jest wymagany"})}
                className={errors.password ? "border-red-500" : "border-gray-500"}
                />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message} </span>
                )}
            </div>
            <button type="submit" className="btn btn-primary" >Zaloguj się</button>
        </form>
    )
}