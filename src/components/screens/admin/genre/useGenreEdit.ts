import { useRouter } from "next/router"
import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

import { IGenreEditInput } from "@/screens/admin/genre/genre-edit.interface"

import { GenreService } from "@/services/genre.service"

import { getKeys } from "@/utils/object/getKeys"
import { toastError } from "@/utils/toastError"

import { getAdminUrl } from "../../../../config/url.config"

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { push, query } = useRouter()
	const genreId = String(query.id)
	const { isLoading } = useQuery(
		["genre", genreId],
		() => GenreService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (error) => {
				toastError(error, "Get genres")
			},
			enabled: !!query.id
		}
	)

	const { mutateAsync } = useMutation(
		"update genres",
		(data: IGenreEditInput) => GenreService.updateGenre(genreId, data),
		{
			onError: (error) => {
				toastError(error, "Get genres")
			},
			onSuccess: () => {
				toastr.success("Update genres", "Update was successful")
				push(getAdminUrl("genres"))
			}
		}
	)
	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
		await mutateAsync(data)
	}
	return { onSubmit, isLoading }
}
