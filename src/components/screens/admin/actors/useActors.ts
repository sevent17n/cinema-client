import { useRouter } from "next/router"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

import { ITableItem } from "@/ui/admin/admin-table/AdminTable/admin-table.interface"

import { useDebounce } from "@/hooks/useDebounce"

import { ActorService } from "@/services/actor.service"
import { MovieService } from "@/services/movie.service"
import { UsersService } from "@/services/users.service"

import { convertMongoDate } from "@/utils/date/convertMongoDate"
import { toastError } from "@/utils/toastError"

import { getAdminUrl } from "../../../../config/url.config"

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState("")
	const debouncedSearch = useDebounce(searchTerm, 500)
	const { push } = useRouter()
	const queryData = useQuery(
		["actor list", debouncedSearch],
		() => ActorService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actor/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)]
					})
				),
			onError: (error) => {
				toastError(error, "Actor List")
			}
		}
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	const { mutateAsync: deleteAsync } = useMutation(
		"delete actor",
		(actorId: string) => ActorService.deleteActor(actorId),
		{
			onError: (error) => {
				toastError(error, "Delete actor")
			},
			onSuccess: () => {
				toastr.success("Delete actor", "deletion was successful")
				queryData.refetch()
			}
		}
	)
	const { mutateAsync: createAsync } = useMutation(
		"create actor",
		() => ActorService.createActor(),
		{
			onError: (error) => {
				toastError(error, "Create actor")
			},
			onSuccess: ({ data: _id }) => {
				toastr.success("Create actor", "Creation was successful")
				push(getAdminUrl(`actor/edit/${_id}`))
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
