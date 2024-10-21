import { Text, View,StyleSheet } from "react-native";
import { FirstScreen } from "./components/screens/FirstScreen";
import { PaymentDetail } from "./components/screens/PaymentDetail";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Connexion,Inscription,Login } from "./components/screens/Connexion";
import { TopTab } from "./components/widgets/Tobtab";
import { Header } from "./components/widgets/Header";
import { Home } from "./components/screens/Home";
import { BottomTab } from "./components/widgets/BottomTab";
import RootLayout from "./_layout";
import { PaymentMode } from "./components/screens/PaymentMode";
const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator initialRouteName="FirstScreen">
      <Stack.Screen name="FirstScreen" component={FirstScreen} options={{headerShown:false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
      <Stack.Screen name="Home" component={BottomTab} options={{headerShown:false}} />
      <Stack.Screen name="PaymentDetail" component={PaymentDetail} options={{headerShown:false}} />
      <Stack.Screen name="PaymentMode" component={PaymentMode} options={{headerShown:false}} />
      </Stack.Navigator>
  );
}


