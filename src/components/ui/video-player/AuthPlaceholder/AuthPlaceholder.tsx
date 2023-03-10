import React, { FC } from "react"

import AuthButton from "@/ui/video-player/AuthPlaceholder/AuthButton"

import styles from "./AuthPlaceholder.module.scss"

const AuthPlaceholder: FC<{ slug: string }> = ({ slug }) => {
	return (
		<div className={styles.placeholder}>
			<div>Sign in to leave comment</div>
			<AuthButton slug={slug} />
		</div>
	)
}

export default AuthPlaceholder
