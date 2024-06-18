import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <footer className="Footer">
      <p>© 2024 Your Website Name. All rights reserved.</p>
      <div className="data-provider-name">
        Weather data provided by:
        <a href="https://openweathermap.org/" target="_blank">
          <img src="https://seeklogo.com/images/O/openweather-logo-3CE20F48B5-seeklogo.com.png" alt="openweatherapp" />
        </a>
      </div>
      <p>
        <a
          onClick={(event) => {
            event.preventDefault();
          }}
          href="#Navbar"
        >
          Home
        </a>{" "}
        <a
          onClick={(event) => {
            event.preventDefault();
          }}
          href="/about"
        >
          About Us
        </a>{" "}
        <a
          onClick={(event) => {
            event.preventDefault();
          }}
          href="/contact"
        >
          Contact Us
        </a>{" "}
        <a
          onClick={(event) => {
            event.preventDefault();
          }}
          href="/terms"
        >
          Terms of Service
        </a>
        <a
          onClick={(event) => {
            event.preventDefault();
          }}
          href="/privacy"
        >
          Privacy Policy
        </a>
      </p>
      <div className="social-media">
        <a
          onClick={(event) => {
            event.preventDefault();
          }}
          href=""
          target="_blank"
        >
          <XIcon />
        </a>
        <a
          onClick={(event) => {
            event.preventDefault();
          }}
          href=""
          target="_blank"
        >
          <FacebookIcon />
        </a>
        <a
          onClick={(event) => {
            event.preventDefault();
          }}
          href=""
          target="_blank"
        >
          <InstagramIcon />
        </a>
        <a
          onClick={(event) => {
            event.preventDefault();
          }}
          href=""
          target="_blank"
        >
          <LinkedInIcon />
        </a>
      </div>
    </footer>
  );
}
