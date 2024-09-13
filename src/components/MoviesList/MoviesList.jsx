import { getMoviesOnCategory } from "../../api/api";
import MovieCard from "../MovieCard/MovieCard";
import { useQuery } from "@tanstack/react-query";

// moviesOnCategory

function MoviesList({ title, category }) {
	const { data: moviesOnCategory } = useQuery({
		initialData: [],
		/*반드시 배열*/
		queryKey: ["movies", { category }],
		// 1. 데이터를 가져오는 함수 하나 넣기, 2. 받아온 친구 저장하기
		queryFn: () =>
			getMoviesOnCategory(category) /* 프로미스 리턴 약속 사용*/,
	});
	console.log(moviesOnCategory);

	// const handleDragTop = () => {
	// 	refetch();
	// };

	return (
		<section className="[&+&]:mt-16">
			<h3 className="mt-0 mb-5 text-3xl font-bold">{title}</h3>

			<ul className="list-none px-10 flex gap-x-5 max-w-[100vw] overflow-x-scroll -mx-10">
				{moviesOnCategory.map((movie) => (
					<li
						key={movie.id}
						className="min-w-[calc((100vw-80px-40px)/5)]"
					>
						<MovieCard movie={movie} />
					</li>
				))}
			</ul>
		</section>
	);
}

export default MoviesList;
