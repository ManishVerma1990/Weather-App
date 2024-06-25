import "./Navbar.css";
import { useState } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";

export default function Navbar({ getLocationInfo, sunriseSunset }) {
  let [location, setLocation] = useState("Mumbai");

  //returns true if day time and false if night time
  let dayTime = new Date() > sunriseSunset.sunrise * 1000 && new Date() < sunriseSunset.sunset * 1000 ? true : false;

  const URL = "https://api.openweathermap.org/geo/1.0/direct?";
  const API_KEY = import.meta.env.VITE_API_KEY;

  let lat, lon, city, state, country; // Preparing variable for sending argument to getLocationInfo

  const updateLocation = (event) => {
    setLocation(event.target.value);
  };

  const fetchLocationInfo = async () => {
    // Fetching location info such as latitude and longitude
    let url = `${URL}q=${location}&appid=${API_KEY}`;

    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      if (!response.ok) {
        console.log(response.status);
      }
      return responseJson;
    } catch (err) {
      console.log("An error occured:", err);
      return null;
    }
  };

  const setLocationInfo = (locationInfo) => {
    lat = locationInfo[0].lat;
    lon = locationInfo[0].lon;
    city = locationInfo[0].name;
    state = locationInfo[0].state;
    country = locationInfo[0].country;
  };

  const handleClick = async () => {
    let locationInfo = await fetchLocationInfo();
    // alert.style.display = "none";

    if (locationInfo.length === 0) {
      const alert = document.querySelector(".alert");
      alert.classList.remove("alert");
    } else {
      setLocationInfo(locationInfo);

      //Sending coordinates to parent (app.jsx)
      getLocationInfo(lat, lon, city, state, country);

      setLocation("");
    }
  };

  const handleAlertClose = () => {
    const alert = document.querySelector("#alert");
    alert.classList.add("alert");
  };

  return (
    <>
      <nav id="Navbar" className="navbar">
        <div className="navbar-brand">
          {/* sets icon based on day and night time */}
          {dayTime ? <WbSunnyIcon className="WbSunnyIcon" /> : <BedtimeIcon className="BedTimeIcon" />}
          <span>Weather App</span>
        </div>
        <div className="searchBox">
          <input onChange={updateLocation} type="text" name="search" id="search" placeholder="Search" value={location} />
          <button onClick={handleClick}>
            <SearchIcon />
            Search
          </button>
        </div>
        <div className="time">
          {new Date().getHours().toString().padStart(2, "0")} : {new Date().getMinutes().toString().padStart(2, "0")}
        </div>
      </nav>
      <div id="alert" className="alert">
        <Alert onClose={handleAlertClose} variant="filled" severity="error">
          <span>No location found with the name "{location}"</span>
        </Alert>
      </div>
    </>
  );
}
