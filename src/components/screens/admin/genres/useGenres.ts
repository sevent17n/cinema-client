import { useRouter } from "next/router"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

import { ITableItem } from "@/ui/admin/admin-table/AdminTable/admin-table.interface"

import { useDebounce } from "@/hooks/useDebounce"

import { GenreService } from "@/services/genre.service"

import { toastError } from "@/utils/toastError"

import { getAdminUrl } from "../../../../config/url.config"

export const useGenres = () => {
	const { push } = useRouter()
	const [searchTerm, setSearchTerm] = useState("")
	const debouncedSearch = useDebounce(searchTerm, 500)
	const queryData = useQuery(
		["genres list", debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genre/edit/${genre._id}`),
						items: [genre.name, genre.slug, genre.icon]
					})
				),
			onError: (error) => {
				toastError(error, "Genre List")
			}
		}
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	const { mutateAsync: deleteAsync } = useMutation(
		"delete genres",
		(genreId: string) => GenreService.deleteGenre(genreId),
		{
			onError: (error) => {
				toastError(error, "Delete genres")
			},
			onSuccess: () => {
				toastr.success("Delete genres", "Creation was successful")
				queryData.refetch()
			}
		}
	)

	const { mutateAsync: createAsync } = useMutation(
		"create genres",
		() => GenreService.createGenre(),
		{
			onError: (error) => {
				toastError(error, "Create genres")
			},
			onSuccess: ({ data: _id }) => {
				toastr.success("Create genres", "Creation was successful")
				push(getAdminUrl(`genre/edit/${_id}`))
			}
		}
	)
	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
