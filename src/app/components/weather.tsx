"use client";
import { useEffect, useState } from "react";
import { fetchWeather } from "../utils/fetchWeather";

const Weather = () => {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeather(6.9271, 79.8612); // Example lat/lon
      console.log("Weather Data:", data); // Debugging
      setWeather(data);
    };

    getWeather();
  }, []);

  return (
    <div className="p-6 bg-gray-200 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Weather App</h2>
      {weather ? (
        <div>
          <p className="text-lg font-semibold">
            📍 Location: {weather.sys?.country}
          </p>
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
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
