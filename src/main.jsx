import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

//dynamic background: changes color based of time of the day.
const dayTimeImages = [
  "https://img.freepik.com/free-vector/trees-mountains-background_23-2148274812.jpg?size=626&ext=jpg",
  "https://img.freepik.com/free-vector/golf-course-with-green-grass-pond-with-bridge-palm-trees-vector-cartoon-tropical-landscape-sport-field-with-hole-golf-ball-pole-with-red-flag-lake_107791-7963.jpg?t=st=1719421428~exp=1719425028~hmac=71e18310141490663dc69bd117d676e9595bea5064d50902a8002ad4bae8c9eb&w=1060",
  "https://img.freepik.com/free-vector/cartoon-nature-landscape-beautiful-sunset-green-field-with-pond-grass-rocks-conifers-purple-sky-with-red-clouds-picturesque-scenery-background-natural-dusk-scene-vector-illustration_107791-10653.jpg?t=st=1719421369~exp=1719424969~hmac=28e92672fa7965ac9a56d388c36bcea9d58998ac58111d4aa3eadf8e4c8064c3&w=1060",
  "https://wallpapercave.com/wp/wp8284257.png",
];

const body = document.getElementById("body");
let hour = new Date().getHours();
if (hour >= 6 && hour < 12) {
  body.style.backgroundImage = `url(${dayTimeImages[0]})`;
} else if (hour >= 12 && hour < 18) {
  body.style.backgroundImage = `url(${dayTimeImages[1]})`;
} else if (hour >= 18 && hour < 21) {
  body.style.backgroundImage = `url(${dayTimeImages[2]})`;
  body.style.color = "white";
} else {
  body.style.backgroundImage = `url(${dayTimeImages[3]})`;
  body.style.color = "white";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
