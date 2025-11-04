import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

export default function App() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const city = "Fortaleza";
  const apiKey = "dee663a7adac8de1ba18e93c1cbc30cc";

  const getWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Astana&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading weather...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
      <Text style={styles.info}>
        Max: {Math.round(weather.main.temp_max)}° | Min: {Math.round(weather.main.temp_min)}°
      </Text>
      <View style={styles.details}>
        <Text>💧 {weather.main.humidity}%</Text>
        <Text>🌬️ {weather.wind.speed} km/h</Text>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3A8A", 
    alignItems: "center",
    justifyContent: "center",
  },
  city: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "600",
  },
  temp: {
    fontSize: 80,
    color: "#fff",
    fontWeight: "bold",
  },
  info: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 20,
  },
  loadingText: {
    color: "#fff",
    marginTop: 15,
  },
});
