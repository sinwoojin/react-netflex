/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext, useAuth } from "./auth.context";

const MoviesContext = createContext();
export const useMovies = () => useContext(MoviesContext);

export function MoviesProvider({ children }) {
	const [likedMovieIds, setLikedMovieIds] = useState([]);
	const { currentUser } = useAuth(AuthContext);
	const toggleLikeMovie = (movieId) => {
		if (!currentUser) return alert("로그인 후에 이용해 주세요");

		const isLiked = likedMovieIds.includes(movieId);

		let newLikedMovieIds = [];
		if (isLiked) {
			newLikedMovieIds = likedMovieIds.filter(
				(likedMovieId) => likedMovieId !== movieId
			);
		} else {
			newLikedMovieIds = [...likedMovieIds, movieId];
		}

		setLikedMovieIds(newLikedMovieIds);
	};

	const checkIsLiked = (movieId) => likedMovieIds.includes(movieId);

	const value = {
		toggleLikeMovie,
		checkIsLiked,
		likedMovieIds,
	};

	useEffect(() => {
		if (currentUser === null) {
			setLikedMovieIds([]);
		}
	}, [currentUser]);
	return (
		<MoviesContext.Provider value={value}>
			{children}
		</MoviesContext.Provider>
	);
}
