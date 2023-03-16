import { IMenu } from "@/components/Layout/Navigation/MenuContainer/menu.interface"

export const firstMenu: IMenu = {
	title: "Меню",
	items: [
		{
			icon: "MdHome",
			link: "/",
			title: "Домой"
		},
		{
			icon: "MdExplore",
			link: "/discovery",
			title: "Подборки по жанрам"
		},
		{
			icon: "MdRefresh",
			link: "/fresh",
			title: "Новинки"
		},
		{
			icon: "MdLocalFireDepartment",
			link: "/trending",
			title: "Популярное"
		}
	]
}
export const userMenu: IMenu = {
	title: "General",
	items: []
}
