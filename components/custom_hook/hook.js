import { useState, useEffect } from "react";

export const useFetch = () => {
	const [localAmount, setLocalAmount] = useState();
	const [userDetails, setUserDetails] = useState({
		country: "",
		country_code: "",
		country_flag: "",
		currency_code: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		setIsLoading(true);
		const res = await fetch("https://api.ipify.org/?format=json");
		const ipData = await res.json();

		const userLocation = await fetch(
			`https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/?ip=${ipData.ip}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-key":
						"1b4ef6cf03mshee8948082025b66p1b5712jsn4a6d315bc934",
					"x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
				},
			}
		);
		const userLocationData = await userLocation.json();

		if (userLocationData.success) {
			const {
				country,
				country_code,
				country_flag,
				currency_code,
			} = userLocationData;
			setUserDetails((prevDetails) => {
				return {
					...prevDetails,
					country,
					country_code,
					country_flag,
					currency_code,
				};
			});

			const dollarBitcoinValue = await fetch(
				`https://api.twelvedata.com/time_series?symbol=BTC/USD&interval=1min&outputsize=1&apikey=a9f7b6db36994c8ca14f5187c47f7b79`
			);
			const { values } = await dollarBitcoinValue.json();
			let currentValue = values[0].open;

			if (currency_code !== "USD") {
				const userBitcoinValue = await fetch(
					`https://api.twelvedata.com/currency_conversion?symbol=USD/${currency_code}&amount=${currentValue}&apikey=a9f7b6db36994c8ca14f5187c47f7b79`
				);

				const { amount } = await userBitcoinValue.json();
				const userLocalCurrency = await new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: `${currency_code}`,
				}).format(amount);
				setLocalAmount(userLocalCurrency);
				setIsLoading(false);
			} else {
				const userLocalCurrency = await new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: `${currency_code}`,
				}).format(currentValue);
				setLocalAmount(userLocalCurrency);
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { localAmount, userDetails, isLoading };
};
