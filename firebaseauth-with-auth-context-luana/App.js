import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthProvider, useAuth } from './context/AuthContext';

import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Signup';
import HomeScreen from './screens/Home';
import EventDetails from './screens/EventDetails';
import FavoritesScreen from './screens/FavoritesScreen';
import ProfileScreen from './screens/ProfileScreen';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
/* Adicionar mais eventos com pagina seedEvents
import { useEffect } from "react";
import { seedEventos } from "./services/seedEvents"; // ajuste o caminho se necessário */

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
      screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Início') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Favoritos') {
          iconName = focused ? 'heart' : 'heart-outline';
        } else if (route.name === 'Perfil') {
          iconName = focused ? 'person' : 'person-outline';
        }

        // Você pode retornar qualquer componente aqui!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007AFF',  // cor do ícone ativo
      tabBarInactiveTintColor: 'gray',  // cor do ícone inativo
    })}
    >
    <Tab.Screen name="Início" component={HomeScreen} />
    <Tab.Screen name="Favoritos" component={FavoritesScreen} />
    <Tab.Screen name="Perfil" component={ProfileScreen} />
  </Tab.Navigator>
);

const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) return null; // você pode adicionar um loading spinner aqui

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Detalhes" component={EventDetails} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
/* adicionar eventos 1 unica vez
  useEffect(() => {
  seedEventos();
}, []); 
*/

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
        <Toast />
      </NavigationContainer>
    </AuthProvider>

  );
}

