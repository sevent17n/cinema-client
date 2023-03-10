import dynamic from "next/dynamic"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { stripHtml } from "string-strip-html"

import { IActorEditInput } from "@/screens/admin/actor/actor-edit.interface"
import { useActorEdit } from "@/screens/admin/actor/useActorEdit"

import SkeletonLoader from "@/ui/SkeletonLoader"
import AdminNavigation from "@/ui/admin/admin-navigation/AdminNavigation"
import Button from "@/ui/form-elements/Button"
import Field from "@/ui/form-elements/Field"
import SlugField from "@/ui/form-elements/SlugField/SlugField"
import UploadFile from "@/ui/form-elements/UploadField/UploadFile"
import Heading from "@/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"
import generateSlug from "@/utils/string/generateSlug"

import formStyles from "../../../ui/form-elements/admin-form.module.scss"

const ActorEdit = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control
	} = useForm<IActorEditInput>({
		mode: "onChange"
	})
	const { isLoading, onSubmit } = useActorEdit(setValue)

	return (
		<>
			<Meta title={"Edit actor"}></Meta>
			<AdminNavigation />
			<Heading title={"Edit actor"} />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register("name", {
									required: "Title is required"
								})}
								placeholder={"Title"}
								error={errors.name}
								style={{ width: "31%" }}
							/>
							<div style={{ width: "31%" }}>
								<SlugField
									register={register}
									generate={() => {
										setValue("slug", generateSlug(getValues("name")))
									}}
									error={errors.slug}
								/>
							</div>
						</div>
						<Controller
							control={control}
							name={"photo"}
							defaultValue={""}
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => (
								<UploadFile
									onChange={onChange}
									placeholder={"Photo"}
									error={error}
									value={value}
									folder={"actors"}
								/>
							)}
							rules={{
								validate: {
									required: (v) =>
										(v && stripHtml(v).result.length > 0) || "Photo required"
								}
							}}
						/>

						<Button>Update</Button>
					</>
				)}
			</form>
		</>
	)
}

export default ActorEdit
