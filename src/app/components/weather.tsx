"use client";
import { useEffect, useState } from "react";
import { fetchWeather, fetchWeatherByCoordinates } from "../utils/fetchWeather";

const Weather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState<string>(""); // For city input
  const [lat, setLat] = useState<number | string>(""); // For latitude input
  const [lon, setLon] = useState<number | string>(""); // For longitude input
  const [searchMethod, setSearchMethod] = useState<"city" | "coordinates">("city");

  // Fetch weather data based on either city name or lat/lon
  const getWeather = async () => {
    let data;

    if (searchMethod === "city" && city) {
      data = await fetchWeather(city);
    } else if (searchMethod === "coordinates" && lat && lon) {
      data = await fetchWeatherByCoordinates(Number(lat), Number(lon));
    }

    console.log("Weather Data:", data); // Debugging
    setWeather(data);
  };

  // Handle search button click
  const handleSearch = () => {
    getWeather();
  };

  return (
    <div className="p-6 bg-gray-200 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Weather App</h2>

      {/* Search Method Toggle */}
      <div className="mb-4">
        <button
          className={`mr-2 ${searchMethod === "city" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setSearchMethod("city")}
        >
          Search by City
        </button>
        <button
          className={`${searchMethod === "coordinates" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setSearchMethod("coordinates")}
        >
          Search by Coordinates
        </button>
      </div>

      {/* City Input */}
      {searchMethod === "city" && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 w-full mb-2 border border-gray-300 rounded"
          />
        </div>
      )}

      {/* Coordinates Input */}
      {searchMethod === "coordinates" && (
        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="p-2 w-full mb-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Enter longitude"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            className="p-2 w-full mb-2 border border-gray-300 rounded"
          />
        </div>
      )}

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Search Weather
      </button>

      {/* Weather Data */}
      {weather ? (
        <div className="mt-6">
          <p className="text-lg font-semibold">📍 Location: {weather.sys?.country}</p>
          <p><strong>City:</strong> {weather.name}</p>
          <p><strong>Temperature:</strong> {weather.main?.temp}°C</p>
          <p><strong>Feels Like:</strong> {weather.main?.feels_like}°C</p>
          <p><strong>Humidity:</strong> {weather.main?.humidity}%</p>
          <p><strong>Pressure:</strong> {weather.main?.pressure} hPa</p>
          <p><strong>Wind Speed:</strong> {weather.wind?.speed} m/s</p>
          <p><strong>Wind Direction:</strong> {weather.wind?.deg}°</p>
          <p><strong>Weather Condition:</strong> {weather.weather?.[0]?.description}</p>
          <p><strong>Cloudiness:</strong> {weather.clouds?.all}%</p>
          <p><strong>Sunrise:</strong> {new Date(weather.sys?.sunrise * 1000).toLocaleTimeString()}</p>
          <p><strong>Sunset:</strong> {new Date(weather.sys?.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      ) : (
        <p className="mt-6">Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
