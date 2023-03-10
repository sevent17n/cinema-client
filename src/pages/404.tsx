import Heading from "@/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"

export default function Error404() {
	return (
		<>
			<Meta title={"Page not found"}>
				<Heading title={"404 - Page Not Found"} />
			</Meta>
			<div className={"text-3xl text-white text-center "}>
				404 - Page Not Found
			</div>
		</>
	)
}
