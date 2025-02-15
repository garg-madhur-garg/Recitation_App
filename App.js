import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddSlokaScreen from './screens/AddSlokaScreen';
import SlokaDetailScreen from './screens/SlokaDetailScreen';

const Stack = createStackNavigator();

const customTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    primary: '#BB86FC',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddSloka" component={AddSlokaScreen} />
        <Stack.Screen name="SlokaDetail" component={SlokaDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}