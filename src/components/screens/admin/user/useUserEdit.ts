import { useRouter } from "next/router"
import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

import { IGenreEditInput } from "@/screens/admin/genre/genre-edit.interface"
import { IMovieEditInput } from "@/screens/admin/movie/movie-edit.interface"
import { IUserEditInput } from "@/screens/admin/user/user-edit.interface"

import { GenreService } from "@/services/genre.service"
import { MovieService } from "@/services/movie.service"
import { UsersService } from "@/services/users.service"

import { getKeys } from "@/utils/object/getKeys"
import { toastError } from "@/utils/toastError"

import { getAdminUrl } from "../../../../config/url.config"

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const { push, query } = useRouter()
	const userId = String(query.id)
	const { isLoading } = useQuery(
		["user", userId],
		() => UsersService.getById(userId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (error) => {
				toastError(error, "Get user")
			},
			enabled: !!query.id
		}
	)

	const { mutateAsync } = useMutation(
		"update user",
		(data: IUserEditInput) => UsersService.updateUser(userId, data),
		{
			onError: (error) => {
				toastError(error, "Get user")
			},
			onSuccess: () => {
				toastr.success("Update user", "Update was successful")
				push(getAdminUrl("users"))
			}
		}
	)
	const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
		await mutateAsync(data)
	}
	return { onSubmit, isLoading }
}
