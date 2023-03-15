import React from "react"

import { useGenres } from "@/screens/admin/genres/useGenres"

import AdminNavigation from "@/ui/admin/admin-navigation/AdminNavigation"
import AdminHeader from "@/ui/admin/admin-table/AdminHeader/AdminHeader"
import AdminTable from "@/ui/admin/admin-table/AdminTable/AdminTable"
import Heading from "@/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"

const GenreList = () => {
	const {
		isLoading,
		searchTerm,
		handleSearch,
		data,
		deleteAsync,
		createAsync
	} = useGenres()
	return (
		<>
			<Meta title={"Genre List"}></Meta>
			<AdminNavigation />
			<Heading title="Genre List" className={" mb-5"} />
			<AdminHeader
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				onClick={createAsync}
			/>
			<AdminTable
				tableItems={data || []}
				isLoading={isLoading}
				headerItems={["Title", "Slug", "Icon"]}
				removeHandler={deleteAsync}
			/>
		</>
	)
}

export default GenreList
