import content from "../config/content.json";

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({message}: EmptyStateProps) => {

    return (
        <div>
            <p>{message ? message : content.common.noResults}</p>
        </div>
    );
}