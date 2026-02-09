import { IResolvers } from '@graphql-tools/utils';
import { CitySuggestionService } from '../application/citySuggestionService';
import { WeatherService } from '../application/weatherService';
import { ActivityRankingService } from '../application/activityRankingService';

export function createResolvers(
  citySuggestionService: CitySuggestionService,
  weatherService: WeatherService,
  activityRankingService: ActivityRankingService
): IResolvers {
  return {
    Query: {
      suggestCities: async (_, { query }) => {
        return citySuggestionService.suggestCities(query);
      },
      getWeather: async (_, { city }) => {
        // For simplicity, find city first
        const cityData = await citySuggestionService.suggestCities(city);
        if (cityData.length === 0) throw new Error('City not found');
        const cityInfo = cityData[0];
        const forecast = await weatherService.getWeather(cityInfo.latitude, cityInfo.longitude);
        return {
          city: cityInfo.name,
          temperature: forecast.temperature,
          condition: forecast.condition,
          precipitation: forecast.precipitation,
          windSpeed: forecast.windSpeed,
          date: forecast.date.toISOString(),
        };
      },
      getActivityRanking: async (_, { city }) => {
        const cityData = await citySuggestionService.suggestCities(city);
        if (cityData.length === 0) throw new Error('City not found');
        const cityInfo = cityData[0];
        const rankings = await activityRankingService.rankActivities(cityInfo);
        return rankings;
      },
    },
  };
}
