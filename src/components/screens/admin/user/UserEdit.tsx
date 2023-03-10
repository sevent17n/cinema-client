import React from "react"
import { Controller, useForm } from "react-hook-form"
import { stripHtml } from "string-strip-html"

import { IGenreEditInput } from "@/screens/admin/genre/genre-edit.interface"
import { useUserEdit } from "@/screens/admin/user/useUserEdit"
import { IUserEditInput } from "@/screens/admin/user/user-edit.interface"

import SkeletonLoader from "@/ui/SkeletonLoader"
import AdminNavigation from "@/ui/admin/admin-navigation/AdminNavigation"
import Button from "@/ui/form-elements/Button"
import Field from "@/ui/form-elements/Field"
import SlugField from "@/ui/form-elements/SlugField/SlugField"
import formStyles from "@/ui/form-elements/admin-form.module.scss"
import Heading from "@/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"
import generateSlug from "@/utils/string/generateSlug"

const UserEdit = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control
	} = useForm<IUserEditInput>({
		mode: "onChange"
	})
	const { onSubmit, isLoading } = useUserEdit(setValue)
	return (
		<>
			<Meta title={"Edit user"}></Meta>
			<AdminNavigation />
			<Heading title={"Edit user"} />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register("email", {
									required: "Email is required"
								})}
								placeholder={"Email"}
								error={errors.email}
								style={{ width: "31%" }}
							/>
							<Field
								{...register("isAdmin", {
									required: "isAdmin is required"
								})}
								placeholder={"isAdmin"}
								error={errors.isAdmin}
								style={{ width: "31%" }}
							/>
						</div>
						<Button>Update</Button>
					</>
				)}
			</form>
		</>
	)
}

export default UserEdit
