import ArticleList from "../components/ArticleList";
import styles from "../styles/Home.module.css";

export const getStaticProps = async () => {
	const randomNumber = function getRandomNumber() {
		return Math.ceil(Math.random() * 10);
	};

	const res = await fetch(
		`https://newscatcher.p.rapidapi.com/v1/search_free?q=cryptocurrency&lang=en&page=2&page_size=12&media=True`,
		{
			method: "GET",
			headers: {
				"x-rapidapi-key": "1b4ef6cf03mshee8948082025b66p1b5712jsn4a6d315bc934",
				"x-rapidapi-host": "newscatcher.p.rapidapi.com",
			},
		}
	);

	const data = await res.json();

	return {
		props: {
			data,
		},
		revalidate: 3,
	};
};

export default function Home({ data: { articles } }) {
	return (
		<>
			<div className={styles.intro}>
				<p>
					<strong>
						CoinNews is your one-stop shop for all the latest news on crypto.
						From Bitcoin (BTC) to Ethereum (ETH), Litcoin (LTC) to Cardano
						(ADA), and so on. You will get the real-time value of any crypto in
						your local currency.
					</strong>
				</p>
			</div>
			<br />
			<br />
			<br />

			<ArticleList articles={articles} className={styles.intro} />
		</>
	);
}
