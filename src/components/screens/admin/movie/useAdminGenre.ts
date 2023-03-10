import { useQuery } from "react-query"

import { ITableItem } from "@/ui/admin/admin-table/AdminTable/admin-table.interface"
import { IOption } from "@/ui/select/select.interface"

import { GenreService } from "@/services/genre.service"

import { toastError } from "@/utils/toastError"

import { getAdminUrl } from "../../../../config/url.config"

export const useAdminGenre = () => {
	const queryData = useQuery(
		"get genres in admin panel",
		() => GenreService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(genre): IOption => ({
						label: genre.name,
						value: genre._id
					})
				),
			onError: (error) => {
				toastError(error, "Genre List")
			}
		}
	)
	return queryData
}
