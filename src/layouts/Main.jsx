import "./Main.css";

import HourlyForecast from "../components/main/HourlyForecast";
import DailyForecast from "../components/main/DailyForecast";
import CurrentWeather from "../components/main/CurrentWeather";

export default function Main({ locationInfo, getSunriseSunset }) {
  // console.log("Main render");

  return (
    <main>
      <CurrentWeather locationInfo={locationInfo} getSunriseSunset={getSunriseSunset} />

      <HourlyForecast locationInfo={locationInfo} />

      <DailyForecast locationInfo={locationInfo} />
    </main>
  );
}
