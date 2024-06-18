import { useState, useEffect } from "react";
import "./CurrentWeather.css";

export default function CurrentWeather({ locationInfo, getSunriseSunset }) {
  let [weather, setWeather] = useState({
    temp: "0",
    weatherDesc: "none",
    weatherIcon: ` https://openweathermap.org/img/wn/01d.png`,
    feelsLike: "none",
    humidity: "none",
    wind: "none",
    pressure: "none",
    sunrise: 0,
    sunset: 0,
  });

  const URL = "https://api.openweathermap.org/data/2.5/weather?";
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchWeatherInfo = async () => {
    // making url string
    let url = `${URL}lat=${locationInfo.lat}&lon=${locationInfo.lon}&units=metric&appid=${API_KEY}`;
    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      if (!response.ok) {
        console.log(response.status);
        return null;
      }
      return responseJson;
    } catch (err) {
      console.log("An error occured:", err);
    }
  };

  // fn for updating the "weather" state, sending an object
  const setWeatherInfo = (weatherInfo) => {
    const getWeatherIcon = () => {
      return ` https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`;
    };
    const data = {
      temp: weatherInfo.main.temp,
      weatherDesc: weatherInfo.weather[0].description,
      weatherIcon: getWeatherIcon(),
      feelsLike: weatherInfo.main.feels_like,
      humidity: weatherInfo.main.humidity,
      wind: weatherInfo.wind.speed,
      pressure: weatherInfo.main.pressure,
      sunrise: weatherInfo.sys.sunrise,
      sunset: weatherInfo.sys.sunset,
    };

    setWeather({ ...data });
  };

  const getWeatherInfo = async () => {
    let weatherInfo = await fetchWeatherInfo();
    setWeatherInfo(weatherInfo);
  };

  // calling functions when component renders once, and again when "locationInfo" changes
  useEffect(() => {
    getWeatherInfo();
  }, [locationInfo]);
  useEffect(() => {
    getSunriseSunset(weather.sunrise, weather.sunset);
  }, [weather]);

  return (
    <div id="CurrentWeather" className="CurrentWeather">
      <div className="current-weather-title">Current Weather</div>
      <div className="location-info">
        {locationInfo.city || "Mumbai"}, {locationInfo.state || "Maharashtra"}
      </div>
      <div className="info-box">
        <div className="info-box-content-2">
          <div className="info-temp"> {weather.temp}&deg;C </div>
          <span>
            <img className="weather-icon" src={weather.weatherIcon} alt="Weather Icon" />
          </span>
          <span className="info-desc">{weather.weatherDesc}</span>
        </div>
        <div className="info-box-content-1">
          <p className="info">Feels like: {weather.feelsLike}&deg;C</p>
          <p className="info">Wind: {weather.wind}m/s</p>
          <p className="info">Humidity: {weather.humidity}%</p>
          <p className="info">Presure: {weather.pressure}hPa</p>
        </div>
      </div>
    </div>
  );
}
