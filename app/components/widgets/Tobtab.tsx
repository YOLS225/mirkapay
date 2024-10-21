import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from '@/app/constants/colors';


const Tab = createMaterialTopTabNavigator();

export  function TopTab({firstTitle,secondTitle,firstComponent,secondComponent,top}:any) {
  return (

      <Tab.Navigator
      style={{marginTop:top}}
      screenOptions={{
        tabBarActiveTintColor: Colors.main.dark, 
        tabBarInactiveTintColor: Colors.main.lightGrey,
        tabBarIndicatorStyle:{
          backgroundColor:Colors.main.orange,
          height:5
        },
        tabBarLabelStyle: {
            fontWeight: 'bold', 
          } 
      }}
      >
        <Tab.Screen name={firstTitle} component={firstComponent} />
        <Tab.Screen name={secondTitle} component={secondComponent} />
      </Tab.Navigator>

  );
}