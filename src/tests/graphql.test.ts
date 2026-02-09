import { createResolvers } from '../presentation/resolvers';
import { CitySuggestionService } from '../application/citySuggestionService';
import { WeatherService } from '../application/weatherService';
import { ActivityRankingService } from '../application/activityRankingService';
import type { CitySuggestion } from '../domain/entities';

describe('GraphQL Resolvers', () => {
  let mockCitySuggestionService: any;
  let mockWeatherService: any;
  let mockActivityRankingService: any;
  let resolvers: any;

  beforeEach(() => {
    mockCitySuggestionService = {
      suggestCities: jest.fn(),
    };

    mockWeatherService = {
      getWeather: jest.fn(),
    };

    mockActivityRankingService = {
      rankActivities: jest.fn(),
    };

    resolvers = createResolvers(
      mockCitySuggestionService,
      mockWeatherService,
      mockActivityRankingService
    );
  });

  describe('suggestCities', () => {
    test('returns city suggestions for valid query', async () => {
      const mockCities: CitySuggestion[] = [
        { name: 'London', country: 'UK', latitude: 51.5, longitude: -0.1 },
        { name: 'Paris', country: 'France', latitude: 48.8, longitude: 2.3 },
      ];

      mockCitySuggestionService.suggestCities.mockResolvedValue(mockCities);

      const result = await resolvers.Query.suggestCities(null, { query: 'Lon' });

      expect(result).toEqual(mockCities);
      expect(mockCitySuggestionService.suggestCities).toHaveBeenCalledWith('Lon');
    });
  });

  describe('getWeather', () => {
    test('returns weather forecast for valid city', async () => {
      const mockCities: CitySuggestion[] = [
        { name: 'London', country: 'UK', latitude: 51.5, longitude: -0.1 },
      ];

      const mockForecast = {
        temperature: 15,
        condition: 'cloudy',
        precipitation: 2,
        windSpeed: 10,
        city: 'London',
        date: new Date('2026-02-07'),
      };

      mockCitySuggestionService.suggestCities.mockResolvedValue(mockCities);
      mockWeatherService.getWeather.mockResolvedValue(mockForecast);

      const result = await resolvers.Query.getWeather(null, { city: 'London' });

      expect(result).toEqual({
        city: 'London',
        temperature: 15,
        condition: 'cloudy',
        precipitation: 2,
        windSpeed: 10,
        date: '2026-02-07T00:00:00.000Z',
      });
      expect(mockWeatherService.getWeather).toHaveBeenCalledWith(51.5, -0.1);
    });

    test('throws error when city not found', async () => {
      mockCitySuggestionService.suggestCities.mockResolvedValue([]);

      await expect(resolvers.Query.getWeather(null, { city: 'NonExistent' })).rejects.toThrow(
        'City not found'
      );
    });
  });

  describe('getActivityRanking', () => {
    test('returns activity rankings for valid city', async () => {
      const mockCities: CitySuggestion[] = [
        { name: 'London', country: 'UK', latitude: 51.5, longitude: -0.1 },
      ];

      const mockRankings = [
        { activity: 'Skiing', score: 9 },
        { activity: 'Surfing', score: 3 },
        { activity: 'Indoor Sightseeing', score: 7 },
        { activity: 'Outdoor Sightseeing', score: 8 },
      ];

      mockCitySuggestionService.suggestCities.mockResolvedValue(mockCities);
      mockActivityRankingService.rankActivities.mockResolvedValue(mockRankings);

      const result = await resolvers.Query.getActivityRanking(null, { city: 'London' });

      expect(result).toEqual(mockRankings);
      expect(mockActivityRankingService.rankActivities).toHaveBeenCalledWith(mockCities[0]);
    });

    test('throws error when city not found', async () => {
      mockCitySuggestionService.suggestCities.mockResolvedValue([]);

      await expect(resolvers.Query.getActivityRanking(null, { city: 'NonExistent' })).rejects.toThrow(
        'City not found'
      );
    });
  });
});
