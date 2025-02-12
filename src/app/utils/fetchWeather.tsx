import axios from "axios";

const API_KEY = "ab7c434fa3cc3f2aa51aa534d7a16a50";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Fetch weather based on city name
export const fetchWeather = async (city: string): Promise<any> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

// Fetch weather based on coordinates
export const fetchWeatherByCoordinates = async (lat: number, lon: number): Promise<any> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
