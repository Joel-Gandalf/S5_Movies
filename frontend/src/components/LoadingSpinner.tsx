import content from "../config/content.json"

export const LoadingSpinner = () => {

    return (

        <div role="status" aria-live="polite">
            <span className="sr-only">{content.common.loading}</span>
        </div>
    );
}