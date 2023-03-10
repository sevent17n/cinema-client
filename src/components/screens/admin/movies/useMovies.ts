import { useRouter } from "next/router"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

import { ITableItem } from "@/ui/admin/admin-table/AdminTable/admin-table.interface"

import { useDebounce } from "@/hooks/useDebounce"

import { GenreService } from "@/services/genre.service"
import { MovieService } from "@/services/movie.service"
import { UsersService } from "@/services/users.service"

import { convertMongoDate } from "@/utils/date/convertMongoDate"
import { getGenresList } from "@/utils/movie/getGenresListEach"
import { toastError } from "@/utils/toastError"

import { getAdminUrl } from "../../../../config/url.config"

export const useMovies = () => {
	const { push } = useRouter()
	const [searchTerm, setSearchTerm] = useState("")
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		["users list", debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
							String(movie.countOpened)
						]
					})
				),
			onError: (error) => {
				toastError(error, "Movie List")
			}
		}
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	const { mutateAsync: deleteAsync } = useMutation(
		"delete movies",
		(movieId: string) => MovieService.deleteMovie(movieId),
		{
			onError: (error) => {
				toastError(error, "Delete movies")
			},
			onSuccess: () => {
				toastr.success("Delete movies", "deletion was successful")
				queryData.refetch()
			}
		}
	)
	const { mutateAsync: createAsync } = useMutation(
		"create movies",
		() => MovieService.createMovie(),
		{
			onError: (error) => {
				toastError(error, "Create movies")
			},
			onSuccess: ({ data: _id }) => {
				toastr.success("Create movies", "Creation was successful")
				push(getAdminUrl(`movie/edit/${_id}`))
			}
		}
	)
	return useMemo(
		() => ({
			handleSearch,
			createAsync,
			...queryData,
			searchTerm,
			deleteAsync
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
