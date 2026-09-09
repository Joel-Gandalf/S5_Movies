export const getPersonRoleLabel = (department: string): string => {
    if (department === "Acting") {
        return "Actor/Actriz";
    }
    if (department === "Directing") {
        return "Director/a";
    }
    return "Profesional cinematográfico";
};