import React, { FC } from "react"

import LogoutButton from "@/components/Layout/Navigation/MenuContainer/Auth/LogoutButton"
import MenuItem from "@/components/Layout/Navigation/MenuContainer/MenuItem"

import { useAuth } from "@/hooks/useAuth"

import { getAdminHomeUrl } from "../../../../../config/url.config"

const AuthItems: FC = () => {
	const { user } = useAuth()

	return (
		<>
			{user ? (
				<>
					<MenuItem
						item={{
							icon: "MdOutlinePermIdentity",
							link: "/profile",
							title: "Профиль"
						}}
					/>
					<LogoutButton />
				</>
			) : (
				<>
					<MenuItem
						item={{
							icon: "MdOutlinePermIdentity",
							link: "/AuthPage",
							title: "Войти"
						}}
					/>
				</>
			)}
			{user?.isAdmin && (
				<MenuItem
					item={{
						icon: "MdOutlineLock",
						link: getAdminHomeUrl(),
						title: "Admin panel"
					}}
				/>
			)}
		</>
	)
}

export default AuthItems
