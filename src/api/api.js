import axios from "axios";

const baseURL = "https://api.themoviedb.org";
const accessToken =
	"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjdiMTJjM2M2NjhiMjNjZThhNmNhMjFiYTE5M2JjYiIsIm5iZiI6MTcyNDgzMjQ5NC41NTE1NTMsInN1YiI6IjY1YTlkNjZjNTM0NjYxMDEzOGNkMTFhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rRVZwTNunIYGQ1-wPudD_JX_4KKTVWUSXtLP5Y4ARqs";

const tmdbClient = axios.create({
	baseURL,
	headers: { Authorization: accessToken },
});

const jsonClient = axios.create({ baseURL: "http://localhost:3000/" });

export const getMoviesOnCategory = async (category) => {
	const url = `/3/movie/${category}?language=ko-KR&page=1`;
	const response = await tmdbClient.get(url);
	const movies = response.data.results;

	return movies;
};

export const getMovie = async (movieId) => {
	const url = `/3/movie/${movieId}?language=ko-KR`;
	const response = await tmdbClient.get(url);
	const movie = response.data;

	return movie;
};

export const likeMovie = async (movieId) => {
	const url = "/likedMovies";
	const response = await jsonClient.post(url, { id: movieId });
	const likedMovie = response.data;

	return likedMovie;
};

export const unlikeMovie = async (movieId) => {
	const url = `/likedMovies/${movieId}`;
	const response = await jsonClient.delete(url);
	const likedMovie = response.data;

	return likedMovie;
};

export const checkIsLikedMovie = async (movieId) => {
	try {
		const url = `likedMovies/${movieId}`;
		const response = await jsonClient.get(url);
		const likedMovie = response.data;
		const isLikedMovie = !!likedMovie;

		return isLikedMovie;
	} catch (e) {
		if (e.status === 404) return false;
	}
};
