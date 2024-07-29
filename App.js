import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import {my_auth} from './src/screens/Firebase';
import HomeStack from './src/TabNavigation/HomeStack';
import LoadingScreen from './src/screens/LoadingScreen';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  
  const [isSignedIn,setIsSignedIn] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  useEffect(()=>{
	  my_auth.onAuthStateChanged(user=>{
		  const SignIn = user!==null?true:false;
		  setIsSignedIn(SignIn);
      setIsLoading(false);
	  })
  },[]);

  return (
    <NavigationContainer>
      
        {
          isLoading? (
            <LoadingScreen/>
          ):(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeStack}/>
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>)}
    </NavigationContainer>   

  );
}
  
  






