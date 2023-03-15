import dynamic from "next/dynamic"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { stripHtml } from "string-strip-html"

import { IGenreEditInput } from "@/screens/admin/genre/genre-edit.interface"
import { useGenreEdit } from "@/screens/admin/genre/useGenreEdit"

import SkeletonLoader from "@/ui/SkeletonLoader"
import AdminNavigation from "@/ui/admin/admin-navigation/AdminNavigation"
import Button from "@/ui/form-elements/Button"
import Field from "@/ui/form-elements/Field"
import SlugField from "@/ui/form-elements/SlugField/SlugField"
import TextEditor from "@/ui/form-elements/TextEditor"
import Heading from "@/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"
import generateSlug from "@/utils/string/generateSlug"

import formStyles from "../../../ui/form-elements/admin-form.module.scss"

const DynamicTextEditor = dynamic(
	() => import("@/ui/form-elements/TextEditor"),
	{
		ssr: false
	}
)
const GenreEdit = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control
	} = useForm<IGenreEditInput>({
		mode: "onChange"
	})
	const { isLoading, onSubmit } = useGenreEdit(setValue)

	return (
		<>
			<Meta title={"Edit genres"}></Meta>
			<AdminNavigation />
			<Heading title={"Edit genres"} />
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
							<Field
								{...register("icon", {
									required: "Icon is required"
								})}
								placeholder={"Icon"}
								error={errors.icon}
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
							name={"description"}
							defaultValue={""}
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => (
								<DynamicTextEditor
									onChange={onChange}
									value={value}
									error={error}
									placeholder={"Description"}
								/>
							)}
							rules={{
								validate: {
									required: (v) =>
										(v && stripHtml(v).result.length > 0) ||
										"Description required"
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

export default GenreEdit
