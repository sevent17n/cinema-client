import { useEffect } from "react"

import { IGenreEditInput } from "@/screens/admin/genre/genre-edit.interface"
import { IMovieEditInput } from "@/screens/admin/movie/movie-edit.interface"

import { IMovie } from "@/shared/types/movie.types"

import axios, { axiosClassic } from "../api/interceptors"
import { getMoviesUrl, getUsersUrl } from "../config/api.config"
import { getGenreUrl, getMovieUrl } from "../config/url.config"

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(``), {
			params: searchTerm
				? {
						searchTerm
				  }
				: {}
		})
	},

	async getPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl("/most-popular")
		)
		return movies
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`))
	},
	async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-genres`), {
			genreIds
		})
	},
	async getByActor(actorIds: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-actor/${actorIds}`))
	},
	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMovieUrl(`${_id}`))
	},
	async updateMovie(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMovieUrl(`${_id}`), data)
	},
	async deleteMovie(_id: string) {
		return axios.delete<string>(getMovieUrl(`${_id}`))
	},
	async createMovie() {
		return axios.post<string>(getMovieUrl(""))
	},
	async updateCountOpened(slug: string) {
		return axiosClassic.put<string>(getMoviesUrl(`/update-count-opened`), {
			slug
		})
	},
	async Get20() {
		useEffect(() => {
			alert("")
		}, [])
		return []
	}
}
