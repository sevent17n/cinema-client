import cn from "classnames"
import { FC, RefObject, useEffect, useState } from "react"

import { useOutsideClick } from "@/components/Layout/MobileNavigation/useClickOutside"
import MenuContainer from "@/components/Layout/Navigation/MenuContainer/MenuContainer"
import Navigation from "@/components/Layout/Navigation/Navigation"
import Search from "@/components/Layout/SideBar/Search/Search"
import SideBar from "@/components/Layout/SideBar/SideBar"

import styles from "./MobileMenu.module.scss"

const MobileMenu: FC<{ active: boolean }> = ({ active }) => {
	const [height, setHeight] = useState(0)
	useEffect(() => {
		setHeight(document.body.scrollHeight)
	}, [])
	return (
		<div
			style={{ height: height }}
			className={cn(styles.menu, {
				[styles.active]: !active
			})}
		>
			<Search className={styles.search} />
			<MenuContainer />
		</div>
	)
}

export default MobileMenu
