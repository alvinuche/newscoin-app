import styles from "../styles/Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p>
				&copy; {new Date().getFullYear()} Coin
				<span className={styles.span}>News</span> Inc.
			</p>
		</footer>
	);
};

export default Footer;
