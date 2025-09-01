import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from './src/screens/DashboardScreen';
import GoalsScreen from './src/screens/GoalsScreen';
import TimerScreen from './src/screens/TimerScreen';
import RoutinesScreen from './src/screens/RoutinesScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import AlertsScreen from './src/screens/AlertsScreen';
import AwardsScreen from './src/screens/AwardsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused ? 'apps' : 'apps-outline';
            } else if (route.name === 'Goals') {
              iconName = focused ? 'flag' : 'flag-outline';
            } else if (route.name === 'Timer') {
              iconName = focused ? 'timer' : 'timer-outline';
            } else if (route.name === 'Routines') {
                iconName = focused ? 'repeat' : 'repeat-outline';
            } else if (route.name === 'Alerts') {
                iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Reports') {
                iconName = focused ? 'analytics' : 'analytics-outline';
            } else if (route.name === 'Awards') {
                iconName = focused ? 'trophy' : 'trophy-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4A90E2',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Goals" component={GoalsScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="Routines" component={RoutinesScreen} />
        <Tab.Screen name="Alerts" component={AlertsScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Reports" component={ReportsScreen} />
        <Tab.Screen name="Awards" component={AwardsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
