import { Link } from "react-router";
import { getProfileImageUrl } from "../utils/getProfileImageUrl";
import type { CastMember } from "../types/CastMember";

interface CastListProps {
    castMembers: CastMember[];
}

export const CastList = ({ castMembers }: CastListProps) => {

    return (
        <ul>
            {castMembers.map(castMember => (
                <li key={`${castMember.id}`}>
                    <Link to={`/people/${castMember.id}`}>
                        <figure>
                            <img src={`${getProfileImageUrl(castMember.profile_path)}`} alt="Fotografía de" />
                            <figcaption>
                                <p>{castMember.name}</p>
                            </figcaption>
                        </figure>
                    </Link>
                </li>
            ))}
        </ul>
    );
}