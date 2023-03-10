import dynamic from "next/dynamic"
import { FC } from "react"

import Content from "@/screens/singleMovie/content/Content"
import { useUpdateCountOpened } from "@/screens/singleMovie/useUpdateCountOpened"

import Banner from "@/ui/banner/Banner"
import Gallery from "@/ui/gallery/Gallery"
import SubHeading from "@/ui/heading/SubHeading"

import Meta from "@/utils/meta/Meta"

import { IMoviePage } from "../../../pages/movies/[slug]"

const DynamicPlayer = dynamic(() => import("@/ui/video-player/VideoPlayer"), {
	ssr: false
})
const DynamicRate = dynamic(
	() => import("@/screens/singleMovie/RateMovie/RateMovie"),
	{
		ssr: false
	}
)
const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	useUpdateCountOpened(movie.slug)
	return (
		<>
			<Meta title={movie.title} description={`Watch ${movie.title}`} />
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>
			<DynamicPlayer videoSource={movie.videoUrl} slug={movie.slug} />
			<div className={"mt-12"}>
				<SubHeading title={"Similar movies"} />
				<Gallery items={similarMovies} />
			</div>
			<DynamicRate slug={movie.slug} _id={movie._id} />
		</>
	)
}

export default SingleMovie
