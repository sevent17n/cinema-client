import React from "react"

import CountUsers from "@/screens/admin/home/statistic/CountUsers"
import PopularMovie from "@/screens/admin/home/statistic/PopularMovie"

import styles from "../Admin.module.scss"

const Statistic = () => {
	return (
		<div className={styles.statistics}>
			<CountUsers />
			<PopularMovie />
		</div>
	)
}

export default Statistic
