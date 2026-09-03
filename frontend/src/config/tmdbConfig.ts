// urls para endpoints
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export const POSTER_SIZE = 'w185';
// query params
export const DEFAULT_DISCOVER_PARAMS = {
  sort_by: 'primary_release_date.desc',
  region: 'ES',
  include_adult: false,
};
// primary_release_date.lte=fecha_actual
// Obtención de la fecha actual:
export const getTodayFormatted = (): string => {
  return new Date().toISOString().slice(0, 10);
};