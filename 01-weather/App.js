import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform, 
  KeyboardAvoidingView, 
  ImageBackground, 
  ActivityIndicator, 
  StatusBar 
} from 'react-native';

import SearchInput from './components/SearchInput'
import getImageForWeather from './utils/getImageForWeather'
import { fetchLocationId, fetchWeather } from './utils/api'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [location, setLocation] = useState('')
  const [temperature, setTemperature] = useState(0)
  const [weather, setWeather] = useState('')
  
  
  const handleUpdateLocation = async (city) => {
    if (!city) return
    try {
        setLoading(true)
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(locationId)
        setLoading(false)
        setError(false)
        setLocation(location)
        setTemperature(temperature)
        setWeather(weather)
      } catch (e) {
        setLoading(false)
        setError(true)
    }
  }

  useEffect(() => {
    handleUpdateLocation('San Francisco')
  }, [])

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior='height'
    >
      <StatusBar barStyle='light-content' />
      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
        <ActivityIndicator
          animating={loading}
          color="white"
          size='small'
        />
        {!loading && (
          <View>
            {error && (
              <Text style={[styles.smallText, styles.textStyle]}>
                Could not load weather, please try a different city.
              </Text> 
            )}
            {!error && (
              <View>
                <Text style={[styles.largeText, styles.textStyle]}>
                  {location}
                </Text>
                <Text style={[styles.smallText, styles.textStyle]}>
                  {weather}
                </Text>
                <Text style={[styles.largeText, styles.textStyle]}>
                  {`${Math.round(temperature)}°`}
                </Text>
                <SearchInput 
                  placeholder='Search any city' 
                  onSubmit={handleUpdateLocation}
                />
              </View>
            )}
          </View>
        )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18
  },
});
