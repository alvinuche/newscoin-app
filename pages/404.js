import Link from "next/link";

const NotFound = () => {
	return (
		<div>
			<br />
			<br />
			<br />
			<h1>Ooooops....</h1>
			<h2>That page cannot be found.</h2>
			<br />
			<br />
			<p>
				Go back to the{" "}
				<Link href="/">
					<a className="homepage_link">Homepage</a>
				</Link>
			</p>
		</div>
	);
};

export default NotFound;
