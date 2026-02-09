import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    suggestCities(query: String!): [CitySuggestion!]!
    getWeather(city: String!): WeatherForecast
    getActivityRanking(city: String!): [ActivityRanking!]!
  }

  type CitySuggestion {
    name: String!
    country: String
    latitude: Float!
    longitude: Float!
  }

  type WeatherForecast {
    city: String!
    temperature: Float!
    condition: String
    precipitation: Float!
    windSpeed: Float!
    date: String!
  }

  type ActivityRanking {
    activity: String!
    score: Float!
  }
`;
