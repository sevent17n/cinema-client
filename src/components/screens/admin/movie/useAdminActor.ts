import { useQuery } from "react-query"

import { ITableItem } from "@/ui/admin/admin-table/AdminTable/admin-table.interface"
import { IOption } from "@/ui/select/select.interface"

import { ActorService } from "@/services/actor.service"
import { GenreService } from "@/services/genre.service"

import { toastError } from "@/utils/toastError"

import { getAdminUrl } from "../../../../config/url.config"

export const useAdminActor = () => {
	const queryData = useQuery(
		"get actor in admin panel",
		() => ActorService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(actor): IOption => ({
						label: actor.name,
						value: actor._id
					})
				),
			onError: (error) => {
				toastError(error, "Actor List")
			}
		}
	)
	return queryData
}
