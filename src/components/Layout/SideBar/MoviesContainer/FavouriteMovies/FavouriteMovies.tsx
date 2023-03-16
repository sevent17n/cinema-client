import dynamic from "next/dynamic"
import { FC } from "react"

import { useFavorites } from "@/screens/favourites/useFavorites"

import NotAuthFavourites from "@/components/Layout/SideBar/MoviesContainer/FavouriteMovies/NotAuthFavourites"
import MovieList from "@/components/Layout/SideBar/MoviesContainer/MovieList"

import SkeletonLoader from "@/ui/SkeletonLoader"

import { useAuth } from "@/hooks/useAuth"

const FavouriteMovies: FC = () => {
	const { favoritesMovies, isLoading } = useFavorites()
	const { user } = useAuth()
	if (!user) return <NotAuthFavourites />
	return isLoading ? (
		<div className={"mt-11"}>
			<SkeletonLoader count={3} className={"h-28 mb-4"} />
		</div>
	) : (
		<MovieList
			movies={favoritesMovies?.slice(0, 3) || []}
			title={"Избранное"}
			link={"/favourites"}
		/>
	)
}

export default FavouriteMovies
