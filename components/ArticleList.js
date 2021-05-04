import Link from "next/link";
import ArticleItem from "./ArticleItem";
import styles from "../styles/Article.module.css";

const ArticleList = ({ articles, className }) => {
	return (
		<div className={className}>
			<div className={styles.header}>
				<h1>Latest Posts</h1>
			</div>
			<br />
			<ul>
				{articles.map((article) => (
					<li key={article._id} className={styles.list_item}>
						<Link href="/article/[id]" as={`/article/${article._id}`}>
							<a>
								<ArticleItem article={article} />
							</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ArticleList;
