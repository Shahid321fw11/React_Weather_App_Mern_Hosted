import styles from "./styles.module.css";
import React, { useState } from "react";
import axios from "axios";
// import "./App.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [data, setData] = useState({});
	const [cityName, setCityName] = useState("");
	const weather_api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=5a18649b9875dbb4fd25b9dce8346a27`;

	const searchLoaction = (event) => {
		// console.log(cityName, setCityName);
		if (event.key === "Enter") {
		axios.get(weather_api).then((response) => {
			setData(response.data);
			console.log(response.data);			
		});
		setCityName("");
		}
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Weather_App</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className={styles.main_weather}>
				<div className={styles.container}>
					<div className={styles.search_box}>
					<input
						value={cityName}
						onChange={(event) => setCityName(event.target.value)}
						onKeyPress={searchLoaction}
						placeholder="Enter Place Name"
						type="text"
					></input>
					</div>
					<div className={styles.top}>
						<p className={styles.name}>{data.name}</p>
						{data.main ? <p className={styles.temp}>{data.main.temp}°F</p> : null}
						{data.weather ? (
							<p className={styles.description}>{data.weather[0].description}</p>
						) : null}
					</div>

					<div className={styles.bottom}>
					{data.main ? (
						<p className={styles.humidity}>
						{data.main.humidity}% <br /> Humidity
						</p>
					) : null}
					{data.main ? (
						<p className={styles.feelsLike}>
						{data.main.feels_like}°F <br /> Feels Like
						</p>
					) : null}
					{data.wind ? (
						<p className={styles.wind_speed}>
						{data.wind.speed} MPH <br /> Wind Speed
						</p>
					) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;