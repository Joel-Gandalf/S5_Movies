import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    error?: string;
    registration: UseFormRegisterReturn;
}

export const FormField = ({ id, label, error, registration, ...inputProps }: FormFieldProps) => {
    const errorId = `${id}-error`;

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                {...registration}
                {...inputProps}
            />
            {error && (
                <p id={errorId} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};