import { FC } from "react"
import { toastr } from "react-redux-toastr"

import Layout from "@/components/Layout/Layout"

import Gallery from "@/ui/gallery/Gallery"
import Heading from "@/ui/heading/Heading"
import SubHeading from "@/ui/heading/SubHeading"
import Slider from "@/ui/slider/Slider"

import Meta from "@/utils/meta/Meta"

import { IHome } from "./home.interface"

const Home: FC<IHome> = ({ slides, trendingMovies, actors }) => {
	return (
		<>
			<Meta title={"Главная"} description={"Free movies"} />
			<Heading
				title={"Смотрите фильмы онлайн"}
				className={"text-gray-300 mb-8 text-xl"}
			/>
			{slides.length && <Slider slides={slides} buttonTitle={"Смотреть"} />}
			<div className={"my-10"}>
				<SubHeading title={"В тренде"} />
				{trendingMovies.length && <Gallery items={trendingMovies} />}
			</div>
			<div className={"my-10"}>
				<SubHeading title={"Лучшие актеры"} />
				{actors.length && <Gallery items={actors} />}
			</div>
		</>
	)
}

export default Home
