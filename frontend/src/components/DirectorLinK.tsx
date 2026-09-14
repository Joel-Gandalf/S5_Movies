import { Link } from "react-router";
import type { CrewMember } from "../types/CrewMember";
import content from "../config/content.json"

interface DirectorLinkProps {
    director: CrewMember | undefined;
}

export const DirectorLink = ({director}: DirectorLinkProps) => {
    

    if (!director) {
        return <p>{content.movieDetail.notInfo}</p>;
    }

    return(

        <Link to={`/people/${director.id}`}>
            <p>{`Director/a: ${director.name}`}</p>
        </Link>
    );
}