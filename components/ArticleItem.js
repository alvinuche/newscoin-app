import Link from "next/link";
import styles from "../styles/Article.module.css";

const ArticleItem = ({ article: { media, title, author, summary, _id } }) => {
	return (
		<div className={styles.container}>
			<div className={styles.image_container}>
				<img
					src={media ? media : "/bitcoin.svg"}
					alt="source photo"
					width="100%"
					height="100%"
				/>
			</div>
			<div className={styles.content_container}>
				<h3 className={styles.content_container_title}>{title}</h3>
				<h6>{author ? author : "News Media"}</h6>
				<p>{summary.substr(0, 100)}...</p>
				{/* <div> */}
				<Link className href="/article/[id]" as={`/article/${_id}`}>
					<button className={styles.link}>Read More</button>
				</Link>
				{/* </div> */}
			</div>
		</div>
	);
};

export default ArticleItem;
