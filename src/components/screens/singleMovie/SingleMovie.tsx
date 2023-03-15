import dynamic from "next/dynamic"
import Script from "next/script"
import React, { FC, useEffect } from "react"

import Content from "@/screens/singleMovie/content/Content"
import { useUpdateCountOpened } from "@/screens/singleMovie/useUpdateCountOpened"

import Banner from "@/ui/banner/Banner"
import Gallery from "@/ui/gallery/Gallery"
import SubHeading from "@/ui/heading/SubHeading"
import VideoPlayer from "@/ui/video-player/VideoPlayer"

import Meta from "@/utils/meta/Meta"

import { IMoviePage } from "../../../pages/movies/[slug]"

const DynamicRate = dynamic(
	() => import("@/screens/singleMovie/RateMovie/RateMovie"),
	{
		ssr: false
	}
)
const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	useUpdateCountOpened(movie.slug)
	const scriptAlreadyExists = () =>
		document.querySelector("script#fb-sdk") !== null
	useEffect(() => {
		const script = document.createElement("script")
		script.id = "fb-sdk"
		script.src = "https://yohoho.cc/yo.js"
		script.async = true
		script.defer = true
		script.crossOrigin = "anonymous"
		document.body.append(script)
	}, [])

	return (
		<>
			<Script src={"https://yohoho.cc/yo.js"} />
			<Meta title={movie.title} description={`Watch ${movie.title}`} />
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>
			<VideoPlayer />
			<div className={"mt-12"}>
				<SubHeading title={"Similar movies"} />
				<Gallery items={similarMovies} />
			</div>
			<DynamicRate slug={movie.slug} _id={movie._id} />
		</>
	)
}

export default SingleMovie
