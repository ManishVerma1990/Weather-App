import "./Footer.css";

export default function Footer() {
  return (
    <footer className="Footer">
      <p>© 2024 Your Website Name. All rights reserved.</p>
      <p>
        Weather data provided by{" "}
        <a href="https://openweathermap.org/" target="_blank">
          OpenWeatherMap
        </a>
        .
      </p>
      <p>
        <a href="/">Home</a> | <a href="/about">About Us</a> | <a href="/contact">Contact Us</a> |<a href="/terms">Terms of Service</a>{" "}
        |<a href="/privacy">Privacy Policy</a>
      </p>
      <div className="social-media">
        <a href="https://twitter.com/yourusername" target="_blank">
          Twitter
        </a>{" "}
        |
        <a href="https://facebook.com/yourusername" target="_blank">
          Facebook
        </a>{" "}
        |
        <a href="https://linkedin.com/in/yourusername" target="_blank">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
