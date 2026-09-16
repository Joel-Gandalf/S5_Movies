import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { FormField } from "../components/FormField";
import type { RegisterFormData } from "../types/RegisterFormData";
import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH } from "../config/authConfig";
import { useAuth } from "../hooks/useAuth";
import { EMAIL_PATTERN } from "../config/authConfig";
import { EMAIL_PATTERN_ERROR_MESSAGE } from "../config/authConfig";
import styles from "../styles/RegisterPage.module.css";

export const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        setSubmitError(null);

        try {
            await registerUser(data);
            navigate("/explore");
        } catch (error) {
            setSubmitError((error as Error).message);
        }
    }

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormField
                    id="username"
                    label="Nombre de usuario"
                    type="text"
                    autoComplete="off"
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
                            message: EMAIL_PATTERN_ERROR_MESSAGE,
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
                {submitError && (
                    <p className={styles.submitError} role="alert">
                        {submitError}
                    </p>
                )}
                <button className={styles.submitButton} type="submit">
                    Registrarse
                </button>
            </form>
        </div>
    );
}