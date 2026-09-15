import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { FormField } from "../components/FormField";
import type { RegisterFormData } from "../types/RegisterFormData";
import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH } from "../config/authConfig";

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
        console.log("Datos del formulario (envío simulado):", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
                id="username"
                label="Nombre de usuario"
                type="text"
                autoComplete="username"
                placeholder="Ej: joel83"
                error={errors.username?.message}
                registration={register("username", {
                    required: "El nombre de usuario es obligatorio",
                    minLength: {
                        value: USERNAME_MIN_LENGTH,
                        message: `Mínimo ${USERNAME_MIN_LENGTH} caracteres`,
                    },
                    maxLength: {
                        value: USERNAME_MAX_LENGTH,
                        message: `Máximo ${USERNAME_MAX_LENGTH} caracteres`,
                    },
                })}
            />

            <FormField
                id="email"
                label="Correo electrónico"
                type="email"
                autoComplete="email"
                placeholder="tucorreo@ejemplo.com"
                error={errors.email?.message}
                registration={register("email", {
                    required: "El correo electrónico es obligatorio",
                    pattern: {
                        value: EMAIL_PATTERN,
                        message: "El formato del correo no es válido",
                    },
                })}
            />

            <FormField
                id="password"
                label="Contraseña"
                type="password"
                autoComplete="new-password"
                placeholder="Mínimo 6 caracteres"
                error={errors.password?.message}
                registration={register("password", {
                    required: "La contraseña es obligatoria",
                })}
            />

            <button type="submit">Registrarse</button>
        </form>
    );
};