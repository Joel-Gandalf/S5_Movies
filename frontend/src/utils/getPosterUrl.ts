import { getImageUrl } from "./getImageUrl";
import { TMDB_IMAGE_BASE_URL, POSTER_SIZE } from "../config/tmdbConfig";
import noPosterImage from "../assets/icons/no-fotos.png";

export const getPosterUrl = (posterPath: string | null, size: string = POSTER_SIZE): string =>
  getImageUrl({
    baseUrl: TMDB_IMAGE_BASE_URL,
    imagePath: posterPath,
    imageSize: size,
    placeholder: noPosterImage,
  });