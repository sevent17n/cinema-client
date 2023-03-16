import dynamic from "next/dynamic"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { stripHtml } from "string-strip-html"

import { IGenreEditInput } from "@/screens/admin/genre/genre-edit.interface"
import { useGenreEdit } from "@/screens/admin/genre/useGenreEdit"
import { IMovieEditInput } from "@/screens/admin/movie/movie-edit.interface"
import { useAdminActor } from "@/screens/admin/movie/useAdminActor"
import { useAdminGenre } from "@/screens/admin/movie/useAdminGenre"
import { useMovieEdit } from "@/screens/admin/movie/useMovieEdit"

import SkeletonLoader from "@/ui/SkeletonLoader"
import AdminNavigation from "@/ui/admin/admin-navigation/AdminNavigation"
import Button from "@/ui/form-elements/Button"
import Field from "@/ui/form-elements/Field"
import SlugField from "@/ui/form-elements/SlugField/SlugField"
import TextEditor from "@/ui/form-elements/TextEditor"
import UploadFile from "@/ui/form-elements/UploadField/UploadFile"
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
const DynamicSelect = dynamic(() => import("@/ui/select/Select"), {
	ssr: false
})
const MovieEdit = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control
	} = useForm<IMovieEditInput>({
		mode: "onChange"
	})
	const { isLoading, onSubmit } = useMovieEdit(setValue)
	const { isLoading: isGenresLoading, data: genres } = useAdminGenre()
	const { isLoading: isActorsLoading, data: actors } = useAdminActor()

	return (
		<>
			<Meta title={"Edit movies"}></Meta>
			<AdminNavigation />
			<Heading title={"Edit movies"} />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register("title", {
									required: "Title is required"
								})}
								placeholder={"Title"}
								error={errors.title}
								style={{ width: "31%" }}
							/>
							<Field
								{...register("kinopoiskId", {
									required: "Id кинопоиска is обязательно"
								})}
								placeholder={"Kinopoisk Id"}
								error={errors.kinopoiskId}
								style={{ width: "31%" }}
							/>
							<div style={{ width: "31%" }}>
								<SlugField
									register={register}
									generate={() => {
										setValue("slug", generateSlug(getValues("title")))
									}}
									error={errors.slug}
								/>
							</div>

							<Field
								{...register("parameters.country", {
									required: "Country is required"
								})}
								placeholder={"Country"}
								error={errors.parameters?.country}
								style={{ width: "31%" }}
							/>
							<Field
								{...register("parameters.duration", {
									required: "Duration is required"
								})}
								placeholder={"Duration (MIN.)"}
								error={errors.parameters?.duration}
								style={{ width: "31%" }}
							/>
							<Field
								{...register("parameters.year", {
									required: "Year is required"
								})}
								placeholder={"Year"}
								error={errors.parameters?.year}
								style={{ width: "31%" }}
							/>
						</div>
						<div className={"flex justify-between"}>
							<div className={"w-5/12"}>
								<Controller
									control={control}
									name={"genres"}
									render={({ field, fieldState: { error } }) => (
										<DynamicSelect
											field={field}
											options={genres || []}
											isLoading={isLoading}
											isMulti
											placeholder={"Genres"}
											error={error}
										/>
									)}
									rules={{
										required: "Select at least one ебаный genres"
									}}
								/>
							</div>
							<div className={"w-5/12"}>
								<Controller
									control={control}
									name={"actors"}
									render={({ field, fieldState: { error } }) => (
										<DynamicSelect
											field={field}
											options={actors || []}
											isLoading={isLoading}
											isMulti
											placeholder={"Actors"}
											error={error}
										/>
									)}
									rules={{
										required: "Select at least one ебучего пидораса актера"
									}}
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
						<div className={"flex justify-between mt-10"}>
							<Controller
								control={control}
								name={"poster"}
								defaultValue={""}
								render={({
									field: { value, onChange },
									fieldState: { error }
								}) => (
									<UploadFile
										onChange={onChange}
										placeholder={"Poster"}
										error={error}
										value={value}
										folder={"movies"}
									/>
								)}
								rules={{
									validate: {
										required: (v) =>
											(v && stripHtml(v).result.length > 0) || "Poster required"
									}
								}}
							/>
							<Controller
								control={control}
								name={"bigPoster"}
								defaultValue={""}
								render={({
									field: { value, onChange },
									fieldState: { error }
								}) => (
									<UploadFile
										onChange={onChange}
										placeholder={"Big Poster"}
										error={error}
										value={value}
										folder={"movies"}
									/>
								)}
								rules={{
									validate: {
										required: (v) =>
											(v && stripHtml(v).result.length > 0) ||
											"Big Poster required"
									}
								}}
							/>
						</div>

						<Button>Update</Button>
					</>
				)}
			</form>
		</>
	)
}

export default MovieEdit
