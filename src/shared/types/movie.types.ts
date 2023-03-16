import { TypeMaterialIconName } from "@/shared/types/icons.types"

export interface IGenre {
	_id: string
	name: string
	slug: string
	description: string
	icon: TypeMaterialIconName
}

export interface IActor {
	_id: string
	name: string

	slug: string

	photo: string
	countMovies: number
}
export interface IParameters {
	year: number

	duration: number

	country: string
}
export interface IMovie {
	_id: string
	poster: string

	bigPoster: string

	title: string

	parameters: IParameters

	slug: string

	rating?: number

	description: string

	countOpened?: number

	videoUrl: string

	kinopoiskId: number

	genres: IGenre[]

	actors: IActor[]

	isSendTelegram?: boolean
}
