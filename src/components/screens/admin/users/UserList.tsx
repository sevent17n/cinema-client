import React from "react"

import { useUsers } from "@/screens/admin/users/useUsers"

import AdminNavigation from "@/ui/admin/admin-navigation/AdminNavigation"
import AdminHeader from "@/ui/admin/admin-table/AdminHeader/AdminHeader"
import AdminTable from "@/ui/admin/admin-table/AdminTable/AdminTable"
import Heading from "@/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"

const UserList = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUsers()

	return (
		<>
			<Meta title={"User List"}></Meta>
			<AdminNavigation />
			<Heading title="User List" className={" mb-5"} />
			<AdminHeader searchTerm={searchTerm} handleSearch={handleSearch} />
			<AdminTable
				tableItems={data || []}
				isLoading={isLoading}
				headerItems={["Email", "Date register"]}
				removeHandler={deleteAsync}
			/>
		</>
	)
}

export default UserList
