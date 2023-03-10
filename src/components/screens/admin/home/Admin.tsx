import React from "react"

import Statistic from "@/screens/admin/home/statistic/Statistic"

import AdminNavigation from "@/ui/admin/admin-navigation/AdminNavigation"
import Heading from "@/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"

const Admin = () => {
	return (
		<>
			<Meta title={"Admin panel"}></Meta>
			<AdminNavigation />
			<Heading title="Some statistic" className={" mb-5"} />
			<Statistic />
		</>
	)
}

export default Admin
