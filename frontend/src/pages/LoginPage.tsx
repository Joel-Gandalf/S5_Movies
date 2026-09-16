import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import type { Location } from "react-router";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { FormField } from "../components/FormField";
import type { LoginFormData } from "../types/LoginFormData";
import { EMAIL_PATTERN, EMAIL_PATTERN_ERROR_MESSAGE } from "../config/authConfig";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/LoginPage.module.css";

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const from = (location.state as { from?: Location } | null)?.from?.pathname ?? "/explore";

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        setSubmitError(null);

        try {
            await login(data);
            navigate(from, { replace: true });
        } catch (error) {
            setSubmitError((error as Error).message);
        }
    }

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    autoComplete="current-password"
                    placeholder="Tu contraseña"
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
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
}