import "./HourlyInfoBox.css";

export default function ({ weatherInfo }) {
  return (
    <div className="HourlyInfoBox">
      <div className="hourly-info-box-time">{weatherInfo.time} </div>
      <div className="hourly-info-box-icon">
        <img src={weatherInfo.weatherIcon} alt="" />
      </div>
      <div className="hourly-info-box-temp">{weatherInfo.temp}&deg;C</div>
      <div className="hourly-info-box-precipitation-1">Precipitation: {weatherInfo.precipitation * 100}%</div>
      <div className="hourly-info-box-precipitation-2">Ppt: {weatherInfo.precipitation * 100}%</div>
    </div>
  );
}
