import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "../screens/MainScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen"
import Entypo from '@expo/vector-icons/Entypo';
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function HomeStack() {
  const Tab = createBottomTabNavigator();
  const [activeTab,setActiveTab]= useState("Home");

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
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
              size={24}
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
              size={24}
              color={activeTab=="Cart"? "#74512D":"gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        listeners={() => ({
          tabPress: () => {
            
            setActiveTab("Profile")
            
          },
        })}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "black", fontWeight: "bold" },
           tabBarIcon: () => (
            <MaterialIcons
              name="account-circle"
              size={24}
              color={activeTab=="Profile"? "#74512D":"gray"}
            />
          )
        }}
      />
      
    </Tab.Navigator>
  );
}
