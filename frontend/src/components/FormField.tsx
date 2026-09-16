import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import styles from "../styles/FormField.module.css";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    error?: string;
    registration: UseFormRegisterReturn;
}

export const FormField = ({ id, label, error, registration, ...inputProps }: FormFieldProps) => {
    const errorId = `${id}-error`;

    return (
        <div className={styles.field}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <input
                id={id}
                className={`${styles.input} ${error ? styles.inputError : ""}`}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                {...registration}
                {...inputProps}
            />
            {error && (
                <p id={errorId} className={styles.errorMessage} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};