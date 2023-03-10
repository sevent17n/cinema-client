import { FC } from "react"

import FavouriteMovies from "@/components/Layout/SideBar/MoviesContainer/FavouriteMovies/FavouriteMovies"
import PopularMovies from "@/components/Layout/SideBar/MoviesContainer/PopularMovies"

const MoviesContainer: FC = () => {
	return (
		<div>
			<PopularMovies />
			<FavouriteMovies />
		</div>
	)
}

export default MoviesContainer
