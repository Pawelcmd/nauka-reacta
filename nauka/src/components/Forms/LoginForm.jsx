import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios";

const yupSchema = yup.object().shape({
    username: yup.string().required("Pole username jest wymagane"),
    password: yup.string().required("Pole hasło jest wymagane")
})

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(yupSchema)
    })

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("https://fakestoreapi.com/auth.login", data)
            console.log(response);

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
            <h1>Logowanie</h1>
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
            <button type="submit" className="btn btn-primary" >Zaloguj się</button>
        </form>
    )
}