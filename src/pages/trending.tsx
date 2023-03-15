import { GetStaticProps, NextPage } from "next"
import React from "react"

import Catalog from "@/ui/catalog-movies/Catalog"
import { usePagination } from "@/ui/pagination/usePagination"

import { IMovie } from "@/shared/types/movie.types"

import { MovieService } from "@/services/movie.service"

const TrendingPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	const moviePage = usePagination()
	return (
		<Catalog
			movies={moviePage || []}
			title={
				"Популярная хуета, но не такая популярная как я среди усатых девственниц"
			}
			description={"Еще одна подборка блядских фильмов, все заебало"}
		/>
	)
}
export const getStaticProps: GetStaticProps = async () => {
	try {
		const movies = await MovieService.getPopularMovies()
		return {
			props: {
				movies
			},
			revalidate: 60
		}
	} catch (e) {
		return {
			notFound: true
		}
	}
}
export default TrendingPage
