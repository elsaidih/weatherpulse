import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft, FaSearch, FaHome, FaCog } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const defaultCity = "Sidi Yahia";
  const [city, setCity] = useState(defaultCity);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async (selectedCity) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather(city);
  }, []);

  // Background gradient based on weather
  const getBackground = () => {
    if (!weather) return "linear-gradient(to bottom, #87ceeb, #f0f8ff)";
    switch (weather.weather[0].main) {
      case "Clouds":
        return "linear-gradient(to bottom, #b0c4de, #e0eafc)";
      case "Rain":
      case "Drizzle":
        return "linear-gradient(to bottom, #a9a9a9, #d3d3d3)";
      case "Clear":
        return "linear-gradient(to bottom, #87ceeb, #f0f8ff)";
      case "Snow":
        return "linear-gradient(to bottom, #f0f8ff, #ffffff)";
      default:
        return "linear-gradient(to bottom, #87ceeb, #f0f8ff)";
    }
  };

  // Weather icon component
  const WeatherIcon = () => {
    if (!weather) return <WiDaySunny className="text-6xl" />;
    switch (weather.weather[0].main) {
      case "Clouds":
        return <WiCloud className="text-6xl" />;
      case "Rain":
      case "Drizzle":
        return <WiRain className="text-6xl" />;
      case "Snow":
        return <WiSnow className="text-6xl" />;
      case "Clear":
      default:
        return <WiDaySunny className="text-6xl" />;
    }
  };

  return (
    <div
      className="h-screen w-full flex flex-col justify-between px-6 py-6 text-black"
      style={{ background: getBackground() }}
    >
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between">
          <FaArrowLeft
            className="text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center gap-2 text-2xl font-bold truncate">
            <MdLocationOn />
            <span>{weather?.name}, {weather?.sys?.country}</span>
          </div>
          <FaSearch
            className="text-2xl cursor-pointer"
            onClick={() => {
              const newCity = prompt("Enter city name:");
              if (newCity) {
                setCity(newCity);
                getWeather(newCity);
              }
            }}
          />
        </div>
        <p className="text-center mt-3 text-sm">
          {new Date().toLocaleString()}
        </p>
      </div>

      {/* Loading & Error */}
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Weather Main Info */}
      {weather && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mt-10">
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold">
                {Math.round(weather.main.temp)}°C
              </h1>
              <p className="text-xl md:text-2xl mt-2 capitalize">
                {weather.weather[0].description}
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <WeatherIcon />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-10 text-lg md:text-xl">
            <div className="space-y-4">
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Rain: {weather.rain ? "Yes" : "No"}</p>
            </div>
            <div className="space-y-4 text-left md:text-right mt-4 md:mt-0">
              <p>Wind: {weather.wind.speed} Km/h</p>
              <p>Pressure: {weather.main.pressure} hPa</p>
            </div>
          </div>
        </>
      )}

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center text-2xl mt-10">
        <FaHome
          className="cursor-pointer"
          onClick={() => {
            setCity(defaultCity);
            getWeather(defaultCity);
          }}
        />
        <MdLocationOn
          className="cursor-pointer"
          onClick={() => {
            const newCity = prompt("Enter city name:");
            if (newCity) {
              setCity(newCity);
              getWeather(newCity);
            }
          }}
        />
        <FaCog
          className="cursor-pointer"
          onClick={() => alert("Settings clicked!")}
        />
      </div>
    </div>
  );
}