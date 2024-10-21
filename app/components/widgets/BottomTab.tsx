import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House } from './House';
import { Coin } from './Coin';
import { Consulter } from './Consulter';
import { Historique } from './Historique';
import { Statistique } from './Statistique';
import { Home } from '../screens/Home';
import { Colors } from '@/app/constants/colors';
import { PaymentDetail } from '../screens/PaymentDetail';
import { PaymentMode } from '../screens/PaymentMode';



function Paye() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>En Developpement!</Text>
    </View>
  );
}

function Consulte() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>En Developpement!</Text>
    </View>
  );
}

function Historik() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>En Developpement!</Text>
    </View>
  );
}

function Statistik() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>En Developpement!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export function BottomTab({actif}:any) {
  return (
    <Tab.Navigator
      initialRouteName={actif}
      screenOptions={{
        tabBarActiveTintColor: Colors.main.blue, // Couleur des icônes actives
        tabBarInactiveTintColor: Colors.main.lightGrey,
        headerShown:false,
      }}
      
    >
      <Tab.Screen
        name="Accueil"
        component={Home}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <House fill={color} height={size} />
          )
        }}
      />
      <Tab.Screen
        name="Payer"
        component={PaymentDetail || PaymentMode}
        options={{
          tabBarLabel: 'Payer',
          tabBarIcon: ({ color, size }) => (
            <Coin fill={color} height={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Consulter"
        component={PaymentMode}
        options={{
          tabBarLabel: 'Consulter',
          tabBarIcon: ({ color, size }) => (
            <Consulter fill={color} height={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Historik"
        component={Historik}
        options={{
          tabBarLabel: 'Historique',
          tabBarIcon: ({ color, size }) => (
            <Historique fill={color} height={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistik"
        component={Statistik}
        options={{
          tabBarLabel: 'Statistique',
          tabBarIcon: ({ color, size }) => (
            <Statistique fill={color} height={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


