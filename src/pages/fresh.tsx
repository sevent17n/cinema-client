import { GetStaticProps, NextPage } from "next"
import React from "react"

import Catalog from "@/ui/catalog-movies/Catalog"

import { IMovie } from "@/shared/types/movie.types"

import { MovieService } from "@/services/movie.service"

const FreshPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title={"Fresh Movies"}
			description={
				"Какие то ебаные фильмы, рот их ебал. Как меня все заебало3, идите науй"
			}
		/>
	)
}
export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll()
		return {
			props: {
				movies
			},
			revalidate: 60
		}
	} catch (error) {
		return {
			notFound: true
		}
	}
}
export default FreshPage
