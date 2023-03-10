import React from "react"

import { useMovies } from "@/screens/admin/movies/useMovies"

import AdminNavigation from "@/ui/admin/admin-navigation/AdminNavigation"
import AdminHeader from "@/ui/admin/admin-table/AdminHeader/AdminHeader"
import AdminTable from "@/ui/admin/admin-table/AdminTable/AdminTable"
import Heading from "@/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"

const MovieList = () => {
	const {
		searchTerm,
		handleSearch,
		data,
		isLoading,
		deleteAsync,
		createAsync
	} = useMovies()
	return (
		<>
			<Meta title={"Movie List"}></Meta>
			<AdminNavigation />
			<Heading title="Movie List" className={" mb-5"} />
			<AdminHeader
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				onClick={createAsync}
			/>
			<AdminTable
				tableItems={data || []}
				isLoading={isLoading}
				headerItems={["Title", "Genres", "Rating", "Views"]}
				removeHandler={deleteAsync}
			/>
		</>
	)
}

export default MovieList
