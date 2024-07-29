import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "../screens/MainScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Entypo from '@expo/vector-icons/Entypo';
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeStack() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "black", fontWeight: "bold" },
          
          tabBarIcon: ({ focused, color }) => (
            <Entypo
              focused={focused}
              name="home"
              size={24}
              color={color}
            />
          ),tabBarOptions: {
            activeTintColor: '#74512D',
            inactiveTintColor: 'black', 
        },
         
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "black", fontWeight: "bold" },
           tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              focused={focused}
              name="account-circle"
              size={24}
              color={color}
            />
          ),tabBarOptions: {
            activeTintColor: '#74512D',
            inactiveTintColor: 'black', 
        },
        }}
      />
    </Tab.Navigator>
  );
}
