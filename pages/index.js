import { Fragment } from "react";
import Link from "next/link";
import posts from "../posts";
import Card from "../components/Card";

function Home({ posts }) {
	const [highlighted, ...old] = posts;
	return (
		<div className="w-full flex flex-col justify-center items-center">
			<div className="flex flex-col w-full">
				<Link
					key={highlighted.id}
					href="/post/[pid]"
					as={`/post/${highlighted.id}`}
				>
					<a>
						<Card post={highlighted} forceBig />
					</a>
				</Link>

				{old.map((p) => (
					<Fragment key={p.id}>
						<Link href="/post/[pid]" as={`/post/${p.id}`}>
							<a>
								<Card post={p} />
							</a>
						</Link>

						<hr></hr>
					</Fragment>
				))}
			</div>
		</div>
	);
}

// This function gets called at build time
export async function getStaticProps() {
	return {
		props: {
			posts,
		},
	};
}

export default Home;
