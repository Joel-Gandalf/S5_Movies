import type { Video } from "../types/Video"

export const getOfficialTrailer = (videos: Video[]): Video | undefined => {

    return videos.find(video => video.type === "Trailer" && video.site === "YouTube" && video.official === true);
}