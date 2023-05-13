import cn from "classnames"
import React, { useState } from "react"

import Burger from "@/components/Layout/MobileNavigation/Burger/Burger"
import MobileMenu from "@/components/Layout/MobileNavigation/MobileMenu/MobileMenu"
import { useOutsideClick } from "@/components/Layout/MobileNavigation/useClickOutside"
import Logo from "@/components/Layout/Navigation/Logo"

import styles from "./MobileNavigation.module.scss"

const MobileNavigation = () => {
	const [isMenuOpened, setIsMenuOpened] = useState(true)

	return (
		<header className={styles.header}>
			<Logo />
			<Burger
				onClick={() => setIsMenuOpened((prev) => !prev)}
				active={isMenuOpened}
			/>
			<MobileMenu active={isMenuOpened} />
		</header>
	)
}

export default MobileNavigation
