import "./Navbar.css";
import { useEffect, useState } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";

export default function Navbar({ getLocationInfo, sunriseSunset }) {
  let [location, setLocation] = useState("");
  let [latitude, setLatitude] = useState();
  let [longitude, setLongitude] = useState();

  //returns true if day time and false if night time
  let dayTime = new Date() > sunriseSunset.sunrise * 1000 && new Date() < sunriseSunset.sunset * 1000 ? true : false;

  const URL = "https://api.openweathermap.org/geo/1.0/direct?";
  const API_KEY = import.meta.env.VITE_API_KEY;

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

  let lat, lon, city, state, country; // Preparing variable for sending argument to getLocationInfo
  const setLocationInfo = (locationInfo) => {
    lat = locationInfo[0].lat;
    lon = locationInfo[0].lon;
    city = locationInfo[0].name;
    state = locationInfo[0].state;
    country = locationInfo[0].country;
  };

  const handleClick = async () => {
    if (!location) return;

    let locationInfo = await fetchLocationInfo();
    // alert.style.display = "none";

    if (locationInfo?.length === 0) {
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const setUserLocation = async () => {
    if (!latitude && !longitude) return;
    // calling api to get city name
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      if (!response.ok) {
        console.log(response.status);
      }

      //making and calling api to get city and state name
      let url2 = `${URL}q=${responseJson.name}&limit=1&appid=${API_KEY}`;

      try {
        let response = await fetch(url2);
        let responseJson = await response.json();
        if (!response.ok) {
          console.log(response.status);
        }
        //setting values that to be sent to app.jsx using getLocationInfo
        setLocationInfo(responseJson);
        getLocationInfo(lat, lon, city, state, country);
      } catch (err) {
        console.log("An error occured:", err);
        return null;
      }
    } catch (err) {
      console.log("An error occured:", err);
    }
  };
  useEffect(() => {
    setUserLocation();
  }, [latitude, longitude]);

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
