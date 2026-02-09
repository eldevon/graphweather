import axios from 'axios';
import { WeatherAPI, WeatherForecast } from '../domain/interfaces';

export class OpenMeteoWeatherClient implements WeatherAPI {
  async getWeather(latitude: number, longitude: number): Promise<WeatherForecast> {
    const params = {
      latitude,
      longitude,
      current_weather: true,
    };
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', { params });
    const data = response.data;

    // Returns current_weather object
    const current = data.current_weather;
    if (!current) {
      throw new Error('Weather data not available');
    }

    return {
      city: '', // will be set in service
      temperature: current.temperature,
      condition: '', //testing
      precipitation: 0, //testing
      windSpeed: current.windspeed,
      date: new Date(),
    };
  }
}
