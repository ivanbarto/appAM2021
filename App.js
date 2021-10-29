
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen } from './screens/start/start'
import { CursosScreen } from './screens/main/CursosScreen';


const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "LoginScreen"
          component = {LoginScreen}     
          options={{ title: 'Bienvenido a CursApp' }}    
        />
        <Stack.Screen
          name = "RegisterScreen"
          component = {RegisterScreen} 
          options={{ title: 'Registro' }}            
        />
         <Stack.Screen
          name = "CursosScreen"
          component = {CursosScreen} 
          options={{ title: 'Cursos' }}            
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

