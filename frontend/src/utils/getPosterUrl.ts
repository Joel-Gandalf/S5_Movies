import { getImageUrl } from "./getImageUrl";
import { TMDB_IMAGE_BASE_URL, POSTER_SIZE } from "../config/tmdbConfig";
import noPosterImage from "../assets/icons/no-fotos.png";

export const getPosterUrl = (posterPath: string | null): string =>
  getImageUrl({
    baseUrl: TMDB_IMAGE_BASE_URL,
    imagePath: posterPath,
    imageSize: POSTER_SIZE,
    placeholder: noPosterImage,
  });