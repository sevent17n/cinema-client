import { FC } from "react"

import SearchList from "@/components/Layout/SideBar/Search/SearchList/SearchList"
import { useSearch } from "@/components/Layout/SideBar/Search/UseSearch"

import SearchField from "@/ui/search-filed/SearchField"

import styles from "./Search.module.scss"

const Search: FC = () => {
	const { isSuccess, data, handleSearch, searchTerm } = useSearch()
	return (
		<div className={styles.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && <SearchList movies={data || []} />}
		</div>
	)
}

export default Search
