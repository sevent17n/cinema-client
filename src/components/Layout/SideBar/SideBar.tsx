import { FC } from "react"

import MoviesContainer from "@/components/Layout/SideBar/MoviesContainer/MoviesContainer"
import Search from "@/components/Layout/SideBar/Search/Search"

import styles from "./SideBar.module.scss"

const SideBar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<Search />
			<MoviesContainer />
		</div>
	)
}

export default SideBar
