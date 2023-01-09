// RN imports
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'

// screens imports from Login folder
import StartScreen from '../screens/Login/StartScreen'
import LoginScreen from '../screens/Login/LoginScreen'
import RegisterScreen from '../screens/Login/RegisterScreen'
import Dashboard from '../screens/Login/Dashboard'
import ResetPasswordScreen from '../screens/Login/ResetPasswordScreen'

const Stack = createStackNavigator()

export default function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{
        headerShown: false,
      }}
    > 
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />  
    </Stack.Navigator>
  )
}