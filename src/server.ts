import { ApolloServer } from 'apollo-server';
import { typeDefs } from './presentation/schema';
import { createResolvers } from './presentation/resolvers';

import { OpenMeteoGeolocationClient } from './infrastructure/geolocationClient';
import { OpenMeteoWeatherClient } from './infrastructure/weatherClient';

import { CitySuggestionService } from './application/citySuggestionService';
import { WeatherService } from './application/weatherService';
import { ActivityRankingService } from './application/activityRankingService';

async function main() {
  // Instantiate infrastructure clients
  const geoClient = new OpenMeteoGeolocationClient();
  const weatherClient = new OpenMeteoWeatherClient();

  // Instantiate services
  const citySuggestionService = new CitySuggestionService(geoClient);
  const weatherService = new WeatherService(weatherClient);
  const activityRankingService = new ActivityRankingService(weatherService);

  // Create resolvers
  const resolvers = createResolvers(
    citySuggestionService,
    weatherService,
    activityRankingService
  );

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

main().catch(console.error);
