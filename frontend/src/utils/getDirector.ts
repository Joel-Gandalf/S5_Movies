import type { CrewMember } from "../types/CrewMember";

export const getDirector = (crew: CrewMember[]): CrewMember | undefined => {

    return  crew.find(member => member.job === "Director");
}