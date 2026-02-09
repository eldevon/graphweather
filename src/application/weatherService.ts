import { WeatherAPI } from '../domain/interfaces';
import { WeatherForecast } from '../domain/entities';

export class WeatherService {
  constructor(private weatherApi: WeatherAPI) {}

  async getWeather(latitude: number, longitude: number): Promise<WeatherForecast> {
    const forecast = await this.weatherApi.getWeather(latitude, longitude);
    return forecast;
  }
}
