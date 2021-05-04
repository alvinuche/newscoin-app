import Layout from "../components/Layout";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Nav />
			<Layout>
				<Component {...pageProps} />
			</Layout>
			<Footer />
		</>
	);
}

export default MyApp;
