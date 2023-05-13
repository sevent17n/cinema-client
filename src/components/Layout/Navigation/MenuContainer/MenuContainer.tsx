import React from "react"

import Menu from "@/components/Layout/Navigation/MenuContainer/Menu"
import GenreMenu from "@/components/Layout/Navigation/MenuContainer/genres/GenreMenu"
import {
	firstMenu,
	userMenu
} from "@/components/Layout/Navigation/MenuContainer/menu.data"

const MenuContainer = () => {
	return (
		<div>
			<Menu menu={firstMenu} />
			<GenreMenu />

			<Menu menu={userMenu} />
		</div>
	)
}

export default MenuContainer
