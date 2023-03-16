import Link from "next/link"
import React, { FC } from "react"

import MovieItem from "@/components/Layout/SideBar/MoviesContainer/MovieItem"
import { IMovieList } from "@/components/Layout/SideBar/MoviesContainer/movie-list.interface"

import styles from "./MovieList.module.scss"

const MovieList: FC<IMovieList> = ({ link, title, movies }) => {
	return (
		<div className={styles.list}>
			<div className={styles.heading}>{title}</div>
			{movies.map((movie) => (
				<MovieItem key={movie._id} movie={movie} />
			))}
			<Link href={link}>
				<a className={styles.button}>Больше</a>
			</Link>
		</div>
	)
}

export default MovieList
