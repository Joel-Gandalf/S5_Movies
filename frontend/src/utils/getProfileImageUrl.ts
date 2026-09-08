import { getImageUrl } from "./getImageUrl";
import { TMDB_IMAGE_BASE_URL, PROFILE_SIZE } from "../config/tmdbConfig";
import noPersonImage from "../assets/icons/no-fotos.png";

export const getProfileImageUrl = (profilePath: string | null, size: string = PROFILE_SIZE): string =>
  getImageUrl({
    baseUrl: TMDB_IMAGE_BASE_URL,
    imagePath: profilePath,
    imageSize: size,
    placeholder: noPersonImage,
  });