import content from "../config/content.json";

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({message}: ErrorMessageProps) => {

    return (
        <div role="alert">
            {message ? message : content.common.genericError}
        </div>
    );
}