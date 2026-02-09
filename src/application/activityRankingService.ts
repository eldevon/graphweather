import type { CitySuggestion } from '../domain/entities';
import type { WeatherService } from './weatherService';

export class ActivityRankingService {
  constructor(private weatherService: WeatherService) {}

  async rankActivities(city: CitySuggestion): Promise<{ activity: string; score: number }[]> {
    const forecast = await this.weatherService.getWeather(city.latitude, city.longitude);
    // Basic activities scores
    const scores = [
      { activity: 'Skiing', score: forecast.temperature < 0 ? 9 : 2 },
      { activity: 'Surfing', score: forecast.condition.includes('wind') ? 8 : 3 },
      { activity: 'Indoor Sightseeing', score: 7 },
      { activity: 'Outdoor Sightseeing', score: forecast.precipitation < 1 ? 8 : 3 },
    ];
    return scores.sort((a, b) => b.score - a.score);
  }
}
