import "./HourlyForecast.css";
import { useState, useEffect } from "react";
import HourlyInfoBox from "./HourlyInfoBox";

export default function HourlyForecast({ locationInfo }) {
  let [weather, setWeather] = useState([
    {
      time: "00 : 00",
      temp: "0",
      weatherDesc: "none",
      weatherIcon: ` https://openweathermap.org/img/wn/01d.png`,
      feelsLike: "none",
      humidity: "none",
      wind: "none",
      pressure: "none",
      precipitation: "none",
    },
  ]);

  const URL = "https://api.openweathermap.org/data/2.5/forecast?";
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchWeatherInfo = async () => {
    // making url string
    let url = `${URL}lat=${locationInfo.lat}&lon=${locationInfo.lon}&units=metric&cnt=8&appid=${API_KEY}`;
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

  // fn for updating the "weather" state, sending an array of object
  const setWeatherInfo = (weatherInfo) => {
    let data = [];

    weatherInfo.list.forEach((element) => {
      const getWeatherIcon = () => {
        return ` https://openweathermap.org/img/wn/${element.weather[0].icon}.png`;
      };

      data.push({
        time: `${new Date(element.dt * 1000).getHours()} : ${new Date(element.dt * 1000).getMinutes()}`, //getting time from "weatherInfo" in terms of hour and minute
        temp: element.main.temp,
        weatherDesc: element.weather[0].description,
        weatherIcon: getWeatherIcon(),
        feelsLike: element.main.feels_like,
        humidity: element.main.humidity,
        wind: element.wind.speed,
        pressure: element.main.pressure,
        precipitation: Math.trunc(element.pop),
      });
    });

    setWeather([...data]);
  };

  const getWeatherInfo = async () => {
    fetchWeatherInfo();
    let weahterInfo = await fetchWeatherInfo();
    setWeatherInfo(weahterInfo);
  };

  // calling functions when component renders once, and again when "locationInfo" changes
  useEffect(() => {
    getWeatherInfo();
  }, [locationInfo]);
  return (
    <div className="HourlyWeather">
      <div className="hourly-weather-title">Hourly Forecast</div>
      <div className="hourly-info-box-container">
        {weather.map((value, index) => (
          <HourlyInfoBox key={index} weatherInfo={value} />
        ))}
      </div>
    </div>
  );
}
