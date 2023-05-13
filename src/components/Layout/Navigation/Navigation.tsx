import { useState } from "react"

import MenuContainer from "@/components/Layout/Navigation/MenuContainer/MenuContainer"

import Logo from "./Logo"
import styles from "./Navigation.module.scss"

const Navigation = () => {
	return (
		<div className={styles.navigation}>
			<Logo />
			<MenuContainer />
		</div>
	)
}

export default Navigation
