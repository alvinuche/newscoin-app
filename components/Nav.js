import { useFetch } from "../components/custom_hook/hook";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Nav.module.css";
import Skeleton from "../components/skeleton/Skeleton";

const Nav = () => {
	const { localAmount, userDetails, isLoading } = useFetch();

	return (
		<nav className={styles.nav}>
			<div className={styles.container}>
				<div>
					<Link href="/">
						<a>
							<h3 className={styles.title}>
								Coin<span className={styles.span}>News</span>
							</h3>
						</a>
					</Link>
				</div>

				<div className={styles.wrapper}>
					<div className={styles.wrapper_btc}>
						<div className={styles.item}>
							{isLoading ? (
								<Skeleton type="avatar" />
							) : (
								<Image
									src="/bitcoin.svg"
									alt="bitcoin logo"
									width={20}
									height={20}
									className={styles.image}
								/>
							)}
						</div>
						<div className={styles.item}>
							{/* <h5>{localAmount && localAmount}</h5> */}
							<h5>{isLoading ? <Skeleton type="text" /> : localAmount}</h5>
						</div>
					</div>

					<div className={styles.wrapper}>
						{isLoading ? (
							<Skeleton type="thumbnail" />
						) : (
							userDetails.country_flag && (
								<Image
									src={userDetails.country_flag}
									alt={userDetails.country}
									width={20}
									height={15}
								/>
							)
						)}
						<div className={styles.country_code}>
							<h6>
								{isLoading ? (
									<Skeleton type="thumbnail" />
								) : (
									userDetails.country_code
								)}
							</h6>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
