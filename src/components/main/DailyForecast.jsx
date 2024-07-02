import "./DailyForecast.css";
import { useState, useEffect } from "react";
import DailyInfoBox from "./DailyInfoBox";

export default function DailyForecast({ locationInfo }) {
  let [weather, setWeather] = useState([
    {
      date: {
        day: "Funday",
        dd: "01",
        mm: "01",
        yy: "2000",
      },
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

  // fn for updating the "weather" state, sending an array of object
  const setWeatherInfo = (weatherInfo) => {
    let data = [];
    //running loop only for every 8th index, i.e. for every 24 hours
    for (let i = 7; i < weatherInfo.list.length; i += 8) {
      let date = new Date(weatherInfo.list[i].dt * 1000);

      //setting date
      const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = weekDays[date.getDay()] || "Funday";
      let dd = date.getDate().toString().padStart(2, "0");
      let mm = (date.getMonth() + 1).toString().padStart(2, "0");
      let yy = date.getFullYear();

      const getWeatherIcon = () => {
        return ` https://openweathermap.org/img/wn/${weatherInfo.list[i].weather[0].icon}.png`;
      };

      data.push({
        date: {
          day: day,
          dd: dd,
          mm: mm,
          yy: yy,
        },
        temp: weatherInfo.list[i].main.temp,
        weatherDesc: weatherInfo.list[i].weather[0].description,
        weatherIcon: getWeatherIcon(),
        feelsLike: weatherInfo.list[i].main.feels_like,
        humidity: weatherInfo.list[i].main.humidity,
        wind: weatherInfo.list[i].wind.speed,
        pressure: weatherInfo.list[i].main.pressure,
        precipitation: weatherInfo.list[i].pop,
      });
    }
    setWeather([...data]);
  };

  const getWeatherInfo = async () => {
    let weahterInfo = await fetchWeatherInfo();
    setWeatherInfo(weahterInfo);
  };

  // calling functions when component renders once, and again when "locationInfo" changes
  useEffect(() => {
    if (locationInfo.lat === "") return;
    getWeatherInfo();
  }, [locationInfo]);

  return (
    <div className="DailyForecast">
      <div className="daily-forecast-title">Daily Forecast</div>
      <div className="daily-info-box-container">
        {weather.map((value, index) => (
          <DailyInfoBox key={index} weatherInfo={value} />
        ))}
      </div>
    </div>
  );
}
