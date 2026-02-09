import { ActivityRankingService } from '../application/activityRankingService';
import { WeatherService } from '../application/weatherService';
import type { CitySuggestion } from '../domain/entities';

const mockWeatherService = {
  getWeather: jest.fn(),
};

test('rankActivities scores correctly for snow conditions', async () => {
  mockWeatherService.getWeather.mockResolvedValue({
    temperature: -5,
    condition: 'snow',
    precipitation: 0,
    windSpeed: 5,
    city: 'Test City',
    date: new Date(),
  });

  const service = new ActivityRankingService(mockWeatherService as unknown as WeatherService);
  const city: CitySuggestion = { name: 'TestCity', latitude: 0, longitude: 0, country: 'Test' };
  const rankings = await service.rankActivities(city);

  expect(rankings.length).toBeGreaterThan(0);
  
  // Check if Skiing is top ranked due to cold temperature
  const topActivity = rankings[0];
  expect(topActivity.activity).toBe('Skiing');
  expect(topActivity.score).toBe(9);

  // Check if Outdoor Sightseeing is ranked higher than Surfing due to low precipitation
  const outdoorRec = rankings.find(r => r.activity === 'Outdoor Sightseeing');
  const surfingRec = rankings.find(r => r.activity === 'Surfing');
  
  expect(outdoorRec?.score).toBeGreaterThan(surfingRec?.score || 0);
});

test('rankActivities adjusts scores based on weather conditions', async () => {
  mockWeatherService.getWeather.mockResolvedValue({
    temperature: 20,
    condition: 'windy',
    precipitation: 5,
    windSpeed: 15,
    city: 'Test City',
    date: new Date(),
  });

  const service = new ActivityRankingService(mockWeatherService as unknown as WeatherService);
  const city: CitySuggestion = { name: 'TestCity', latitude: 0, longitude: 0, country: 'Test' };
  const rankings = await service.rankActivities(city);

  // Warm temperature, Skiing should have low score
  const skiingRec = rankings.find(r => r.activity === 'Skiing');
  expect(skiingRec?.score).toBe(2);

  // Windy conditions, Surfing should have high score
  const surfingRec = rankings.find(r => r.activity === 'Surfing');
  expect(surfingRec?.score).toBe(8);
});