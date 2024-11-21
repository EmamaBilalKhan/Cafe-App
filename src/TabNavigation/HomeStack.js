import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "../screens/MainScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CartScreen from "../screens/CartScreen"
import Entypo from '@expo/vector-icons/Entypo';
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function HomeStack() {
  const Tab = createBottomTabNavigator();
  const [activeTab,setActiveTab]= useState("Home");

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle:{minHeight: hp(7) } }}>
      <Tab.Screen
        name="Home"
        component={MainScreen}
        listeners={() => ({
          tabPress: () => {
            
            setActiveTab("Home")
            
          },
        })}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "black", fontWeight: "bold"},
          tabBarIcon: () => (
            <Entypo
              name="home"
              size={hp(3)}
              color={activeTab=="Home"? "#74512D":"gray"}
            />
          )
         
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        listeners={() => ({
          tabPress: () => {
            
            setActiveTab("Cart")
            
          },
        })}
        options={{
          tabBarLabel: "Cart",
          tabBarLabelStyle: { color: "black", fontWeight: "bold" },
           tabBarIcon: () => (
            <MaterialIcons
              name="shopping-cart"
              size={hp(3)}
              color={activeTab=="Cart"? "#74512D":"gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        listeners={() => ({
          tabPress: () => {
            
            setActiveTab("Settings")
            
          },
        })}
        options={{
          tabBarLabel: "Settings",
          tabBarLabelStyle: { color: "black", fontWeight: "bold" },
           tabBarIcon: () => (
            <MaterialIcons
              name="settings"
              size={hp(3)}
              color={activeTab=="Settings"? "#74512D":"gray"}
            />
          )
        }}
      />
      
    </Tab.Navigator>
  );
}
