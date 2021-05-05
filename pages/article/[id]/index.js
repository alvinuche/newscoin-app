import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../../styles/Article.module.css";

export const getStaticPaths = async () => {
	const res = await fetch(
		`https://newscatcher.p.rapidapi.com/v1/search_free?q=cryptocurrency&lang=en&page=5&page_size=15&media=True`,
		{
			method: "GET",
			headers: {
				"x-rapidapi-key": "1b4ef6cf03mshee8948082025b66p1b5712jsn4a6d315bc934",
				"x-rapidapi-host": "newscatcher.p.rapidapi.com",
			},
		}
	);
	const { articles } = await res.json();

	const paths = articles.map((article) => {
		return {
			params: { id: article._id },
		};
	});

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps = async ({ params }) => {
	const res = await fetch(
		`https://newscatcher.p.rapidapi.com/v1/search_free?q=cryptocurrency&lang=en&page=5&page_size=15&media=True`,
		{
			method: "GET",
			headers: {
				"x-rapidapi-key": "1b4ef6cf03mshee8948082025b66p1b5712jsn4a6d315bc934",
				"x-rapidapi-host": "newscatcher.p.rapidapi.com",
			},
		}
	);

	const { articles } = await res.json();

	const data = articles.find((article) => article._id === params.id);

	return {
		props: {
			data,
		},
		revalidate: 3,
	};
};

const article = ({
	data: { _id, title, author, published_date, summary, link },
}) => {
	const router = useRouter();

	if (router.isFallback) {
		return (
			<div>
				<h2>Loading</h2>
			</div>
		);
	}

	return (
		<div key={_id} className={styles.article_container}>
			<h1>{title}</h1>
			<br />

			<p>
				<strong>{author ? author : "News Media"}</strong>
			</p>
			{/* <p> */}
			<small>{new Date(published_date).toDateString()}</small>
			{/* </p> */}

			<br />
			<br />
			<p>{summary}</p>
			<br />

			<div className={styles.link_container}>
				<a href={link} target="blank" className={styles.visit_page}>
					Visit Page
				</a>
				<Link href="/">
					<a className={styles.visit_page + " " + styles.home_btn}>Home</a>
				</Link>
			</div>
		</div>
	);
};

export default article;
