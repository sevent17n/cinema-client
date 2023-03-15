import Catalog from "@/ui/catalog-movies/Catalog"
import Button from "@/ui/form-elements/Button"
import Pagination from "@/ui/pagination/Pagination"
import { usePagination } from "@/ui/pagination/usePagination"

const FreshPage = () => {
	const { isLoading, page, movies, setPage, scrollToTop } = usePagination()
	return (
		!isLoading &&
		movies && (
			<>
				<Catalog
					movies={movies}
					title={"Fresh Movies"}
					description={"Какие то  фильмы"}
				/>
				<Pagination
					movies={movies}
					page={page}
					setPage={setPage}
					scrollToTop={scrollToTop}
				/>
			</>
		)
	)
}

// export const getStaticProps: GetStaticProps = async () => {
// 	try {
// 		const { data: movies } = await MovieService.getAll()
// 		return {
// 			props: {
// 				movies
// 			},
// 			revalidate: 60
// 		}
// 	} catch (error) {
// 		return {
// 			notFound: true
// 		}
// 	}
// }
export default FreshPage
