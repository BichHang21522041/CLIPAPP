import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ResultScreen from '../screens/ResultScreen';
import UploadScreen from '../screens/UploadScreen';
import AboutScreen from '../screens/AboutScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator();
export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Home" options={{headerShown: false}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Upload"
        component={UploadScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
