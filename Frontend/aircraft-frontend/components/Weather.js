import React, { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./Weather.css"; // ✅ Import external CSS for glow effect

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "e979dd32411b44719422ae31279baf4d";

  // ✅ Weather Icons
  const getWeatherIcon = (condition) => {
    if (!condition) return "☁";
    condition = condition.toLowerCase();
    if (condition.includes("rain")) return "🌧";
    if (condition.includes("storm") || condition.includes("thunder")) return "⛈";
    if (condition.includes("snow")) return "❄";
    if (condition.includes("clear") || condition.includes("sun")) return "☀";
    return "☁";
  };

  // ✅ Flight Suggestions
  const getFlightSuggestion = (condition, temp) => {
    if (!condition) return "";
    condition = condition.toLowerCase();

    if (condition.includes("storm") || condition.includes("thunder"))
      return "⚠ Severe Storm! Flights likely delayed or canceled.";
    if (condition.includes("rain"))
      return "🌧 Heavy Rain! Expect delays. Check with airline.";
    if (condition.includes("snow"))
      return "❄ Snow Alert! High chance of cancellations.";
    if (condition.includes("clear") || condition.includes("sun")) {
      if (temp > 38) return "🔥 Very Hot! Flights may experience turbulence.";
      return "☀ Clear skies. Flights should operate normally.";
    }
    if (condition.includes("cloud"))
      return "☁ Slightly Cloudy. Flights should operate normally.";
    return "ℹ Check with airline for updates.";
  };

  // ✅ Dynamic Background Image
  const getBackgroundImage = (condition) => {
    if (!condition)
      return "url('https://static.vecteezy.com/system/resources/previews/007/354/009/large_2x/white-fluffy-clouds-with-blue-sky-on-sunny-day-beautiful-summer-cloudy-sky-background-free-photo.jpg')";

    condition = condition.toLowerCase();

    if (condition.includes("rain"))
      return "url('https://wallpaperaccess.com/full/834134.jpg')";
    if (condition.includes("storm") || condition.includes("thunder"))
      return "url('https://th.bing.com/th/id/R.6c5e5897e2113a10d9448cb0dd4a4234?rik=pLRPFw1vQNRjyQ&riu=http%3a%2f%2feskipaper.com%2fimages%2fstorm-5.jpg&ehk=ohk%2fniknTSi2xk%2berVkdK4lq4%2b8sm5JJz79Kx7gsvvg%3d&risl=&pid=ImgRaw&r=0')";
    if (condition.includes("snow"))
      return "url('https://cdn.wallpapersafari.com/32/86/3AJqoO.jpg')";
    if (condition.includes("clear") || condition.includes("sun"))
      return "url('https://img.freepik.com/premium-photo/green-grass-field-with-sky-clouds-ai-generated_838900-4939.jpg')";
    if (condition.includes("cloud"))
      return "url('https://cdn.pixabay.com/photo/2019/09/17/06/54/cloud-4482662_1280.jpg')";
    return "url('https://static.vecteezy.com/system/resources/previews/007/354/009/large_2x/white-fluffy-clouds-with-blue-sky-on-sunny-day-beautiful-summer-cloudy-sky-background-free-photo.jpg')";
  };

  const getWeather = async () => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      const dailyForecast = forecastResponse.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(dailyForecast);
      setError("");
    } catch (err) {
      setError("City not found or API error.");
      setWeather(null);
      setForecast([]);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        textAlign: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundImage: getBackgroundImage(weather?.weather[0]?.description),
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      {/* ✅ Glow effect heading */}
      <h2 className="mb-3 glow-heading">
        ☁ Air India Global Weather Forecast
      </h2>

      <div className="d-flex justify-content-center mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-success ms-2" onClick={getWeather}>
          Get Weather
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {weather && (
        <div
          className="p-4 rounded shadow text-center"
          style={{
            backgroundColor: "#ffffffcc",
            maxWidth: "500px",
            margin: "auto",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          <h4 style={{ marginBottom: "15px" }}>
            {weather.name}, {weather.sys.country}
          </h4>
          <div style={{ fontSize: "60px" }}>
            {getWeatherIcon(weather.weather[0].description)}
          </div>
          <p><b>Temperature:</b> {weather.main.temp}°C</p>
          <p><b>Condition:</b> {weather.weather[0].description}</p>
          <p><b>Humidity:</b> {weather.main.humidity}%</p>
          <p><b>Wind Speed:</b> {weather.wind.speed} m/s</p>
          <p className="mt-2" style={{ color: "#d32f2f" }}>
            {getFlightSuggestion(weather.weather[0].description, weather.main.temp)}
          </p>
        </div>
      )}

      {forecast.length > 0 && (
        <div
          className="mt-4"
          style={{
            backgroundColor: "#ffffffcc",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "700px",
            margin: "auto",
          }}
        >
          <h5 className="text-center" style={{ color: "#0d47a1" }}>
            5-Day Temperature Forecast
          </h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={forecast.map((item) => ({
                date: item.dt_txt.split(" ")[0],
                temp: item.main.temp,
              }))}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#1976d2" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Weather;
