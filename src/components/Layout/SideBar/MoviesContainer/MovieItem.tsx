import Image from "next/image"
import Link from "next/link"
import React, { FC } from "react"

import MaterialIcon from "@/ui/MaterialIcon"

import { IMovie } from "@/shared/types/movie.types"

import { getGenresListEach } from "@/utils/movie/getGenresListEach"

import { getGenreUrl, getMovieUrl } from "../../../../config/url.config"

import styles from "./MovieList.module.scss"

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.item}>
			<Link href={getMovieUrl(movie.slug)}>
				<a>
					<img
						draggable={false}
						alt={movie.title}
						width={66}
						height={100}
						src={movie.poster}
						// priority
						className={styles.image}
					/>
				</a>
			</Link>
			<div className={styles.info}>
				<div>
					<div className={styles.title}>{movie.title}</div>
				</div>
				<div className={styles.genres}>
					{movie.genres.map((genre, index) => (
						<Link key={genre._id} href={getGenreUrl(genre.slug)}>
							<a>{getGenresListEach(index, movie.genres.length, genre.name)}</a>
						</Link>
					))}
				</div>
				<div className={styles.rating}>
					<MaterialIcon name={"MdStarRate"} />
					<span>{movie.rating?.toFixed(1)}</span>
				</div>
			</div>
		</div>
	)
}

export default MovieItem
