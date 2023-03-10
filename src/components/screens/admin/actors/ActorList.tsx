import React from "react"

import { useActors } from "@/screens/admin/actors/useActors"

import AdminNavigation from "@/ui/admin/admin-navigation/AdminNavigation"
import AdminHeader from "@/ui/admin/admin-table/AdminHeader/AdminHeader"
import AdminTable from "@/ui/admin/admin-table/AdminTable/AdminTable"
import Heading from "@/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"

const ActorList = () => {
	const {
		isLoading,
		searchTerm,
		handleSearch,
		data,
		deleteAsync,
		createAsync
	} = useActors()
	return (
		<>
			<Meta title={"Admin panel"}></Meta>
			<AdminNavigation />
			<Heading title="Some statistic" className={" mb-5"} />
			<AdminHeader
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				onClick={createAsync}
			/>
			<AdminTable
				tableItems={data || []}
				isLoading={isLoading}
				headerItems={["Name", "Filmed times"]}
				removeHandler={deleteAsync}
			/>
		</>
	)
}

export default ActorList
