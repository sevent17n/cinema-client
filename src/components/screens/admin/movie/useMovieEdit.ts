import { useRouter } from "next/router"
import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

import { IGenreEditInput } from "@/screens/admin/genre/genre-edit.interface"
import { IMovieEditInput } from "@/screens/admin/movie/movie-edit.interface"

import { GenreService } from "@/services/genre.service"
import { MovieService } from "@/services/movie.service"

import { getKeys } from "@/utils/object/getKeys"
import { toastError } from "@/utils/toastError"

import { getAdminUrl } from "../../../../config/url.config"

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { push, query } = useRouter()
	const movieId = String(query.id)
	const { isLoading } = useQuery(
		["movie", movieId],
		() => MovieService.getById(movieId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (error) => {
				toastError(error, "Get movies")
			},
			enabled: !!query.id
		}
	)

	const { mutateAsync } = useMutation(
		"update movies",
		(data: IMovieEditInput) => MovieService.updateMovie(movieId, data),
		{
			onError: (error) => {
				toastError(error, "Get movies")
			},
			onSuccess: () => {
				toastr.success("Update movies", "Update was successful")
				push(getAdminUrl("movies"))
			}
		}
	)
	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		await mutateAsync(data)
	}
	return { onSubmit, isLoading }
}
