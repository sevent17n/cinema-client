import { useRouter } from "next/router"
import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

import { IActorEditInput } from "@/screens/admin/actor/actor-edit.interface"
import { IGenreEditInput } from "@/screens/admin/genre/genre-edit.interface"

import { ActorService } from "@/services/actor.service"
import { GenreService } from "@/services/genre.service"

import { getKeys } from "@/utils/object/getKeys"
import { toastError } from "@/utils/toastError"

import { getAdminUrl } from "../../../../config/url.config"

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const { push, query } = useRouter()
	const actorId = String(query.id)
	const { isLoading } = useQuery(
		["actor", actorId],
		() => ActorService.getById(actorId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (error) => {
				toastError(error, "Get actor")
			},
			enabled: !!query.id
		}
	)

	const { mutateAsync } = useMutation(
		"update actor",
		(data: IActorEditInput) => ActorService.updateActor(actorId, data),
		{
			onError: (error) => {
				toastError(error, "Get actor")
			},
			onSuccess: () => {
				toastr.success("Update actor", "Update was successful")
				push(getAdminUrl("actors"))
			}
		}
	)
	const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
		await mutateAsync(data)
	}
	return { onSubmit, isLoading }
}
