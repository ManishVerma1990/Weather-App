import Navbar from "./layouts/Navbar.jsx";
import Main from "./layouts/Main.jsx";
import Footer from "./layouts/Footer.jsx";
import { useState } from "react";

function App() {
  let [locationInfo, setLocationInfo] = useState({
    lat: "19.0785451",
    lon: "72.878176",
    city: "Mumbai",
    state: "Maharashtra",
    country: "IN",
  });
  let [sunriseSunset, setSunriseSunset] = useState({ sunrise: 0, sunset: 0 });

  const getLocationInfo = (lat, lon, city, state, country) => {
    setLocationInfo({ lat: lat, lon: lon, city: city, state: state, country: country });
  };

  const getSunriseSunset = (sunrise, sunset) => {
    setSunriseSunset(() => {
      return { sunrise, sunset };
    });
  };
  return (
    <div className="App">
      <Navbar getLocationInfo={getLocationInfo} sunriseSunset={sunriseSunset} />
      <Main locationInfo={locationInfo} getSunriseSunset={getSunriseSunset} />
      <Footer />
    </div>
  );
}

export default App;
