// components/WeatherBanner.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const API_KEY = 'bd9098671e0401802b6dc27d4e4cad50'; // Replace with your OpenWeatherMap API key

export default function WeatherBanner({ onWeatherFetched }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );

        

        const data = await response.json();
        if (data && data.main && data.weather && data.name) {
          const desc = data.weather[0].main;
          const temp = Math.round(data.main.temp);
          const city = data.name;
          setWeather(`${desc} ${temp}°C in ${city}`);
          onWeatherFetched(`${desc} ${temp}°C`, city);
        } else {
          setError('Failed to retrieve weather data');
        }
      } catch (err) {
        setError('Error fetching weather');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <ActivityIndicator size="small" color="#4CAF50" style={{ marginBottom: 10 }} />;
  if (error) return <Text style={{ color: '#999', fontSize: 14, marginBottom: 10 }}>{error}</Text>;

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontSize: 16 }}>🌤 {weather}</Text>
    </View>
  );
}
