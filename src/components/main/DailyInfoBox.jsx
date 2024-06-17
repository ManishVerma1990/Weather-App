import OpacityIcon from "@mui/icons-material/Opacity";
import "./DailyInfoBox.css";

export default function DailyInfoBox({ weatherInfo }) {
  return (
    <div className="DailyInfoBox">
      <div className="date">
        <span className="daily-info-box-day">{weatherInfo.date.day} </span>
        <br />
        <span className="daily-info-box-date">
          {weatherInfo.date.dd}/{weatherInfo.date.mm}
        </span>
      </div>
      <div className="temperature">
        <img src={weatherInfo.weatherIcon} alt="Weather Icon" />
        <span className="temp">{weatherInfo.temp}&deg;C </span>
      </div>
      <div className="description">{weatherInfo.weatherDesc} </div>
      <div className="precipitation">
        <OpacityIcon className="icon" />
        <span className="ppt">{weatherInfo.precipitation.toString().padStart(5, "0")}%</span>
      </div>
    </div>
  );
}
