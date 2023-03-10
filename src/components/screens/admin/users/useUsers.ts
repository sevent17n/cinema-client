import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

import { ITableItem } from "@/ui/admin/admin-table/AdminTable/admin-table.interface"

import { useDebounce } from "@/hooks/useDebounce"

import { UsersService } from "@/services/users.service"

import { convertMongoDate } from "@/utils/date/convertMongoDate"
import { toastError } from "@/utils/toastError"

import { getAdminUrl } from "../../../../config/url.config"

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState("")
	const debouncedSearch = useDebounce(searchTerm, 500)
	const queryData = useQuery(
		["users list", debouncedSearch],
		() => UsersService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editUrl: getAdminUrl(`user/edit/${user._id}`),
						items: [user.email, convertMongoDate(user.createdAt)]
					})
				),
			onError: (error) => {
				toastError(error, "User List")
			}
		}
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	const { mutateAsync: deleteAsync } = useMutation(
		"delete user",
		(userId: string) => UsersService.deleteUser(userId),
		{
			onError: (error) => {
				toastError(error, "Delete user")
			},
			onSuccess: () => {
				toastr.success("Delete user", "deletion was successful")
				queryData.refetch()
			}
		}
	)
	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync
		}),
		[queryData, searchTerm, deleteAsync]
	)
}
