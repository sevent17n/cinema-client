import React from "react"
import { useQuery } from "react-query"

import MovieList from "@/components/Layout/SideBar/MoviesContainer/MovieList"

import SkeletonLoader from "@/ui/SkeletonLoader"

import { MovieService } from "@/services/movie.service"

const PopularMovies = () => {
	const { isLoading, data } = useQuery(
		"popular movies in sidebar",
		() => MovieService.getPopularMovies(),
		{
			select: (data) => data.slice(0, 3)
		}
	)
	return isLoading ? (
		<div className={"mt-11"}>
			<SkeletonLoader count={3} className={"h-28 mb-4"} />
		</div>
	) : (
		<MovieList link={"/trending"} movies={data || []} title={"Популярное"} />
	)
}

export default PopularMovies
