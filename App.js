import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import {my_auth} from './src/screens/Firebase';
import HomeStack from './src/TabNavigation/HomeStack';
import LoadingScreen from './src/screens/LoadingScreen';
import { useEffect, useState } from 'react';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import Products from './src/components/Products';
import ConfirmOrderScreen from './src/screens/ConfirmOrderScreen';
import OrderCompletedScreen from './src/screens/OrderCompletedScreen';
import ForgotPassword from './src/screens/ForgotPassword';
import Map from './src/screens/Map';
import { SafeAreaProvider} from 'react-native-safe-area-context';

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
      <SafeAreaProvider>
        {
          isLoading? (
            <LoadingScreen/>
          ):(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          
          <>
            <Stack.Screen name="HomeScreen" component={HomeStack}/>
            <Stack.Screen name='Products' component={Products}/>
            <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen}/>
            <Stack.Screen name="ConfirmOrderScreen" component={ConfirmOrderScreen}/>
            <Stack.Screen name="OrderCompletedScreen" component={OrderCompletedScreen}/>
            <Stack.Screen name="Map" component={Map}/>
            </>
          
          
        ) : (
          
            <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
            </>
          
        )}
      </Stack.Navigator>)}
      </SafeAreaProvider>
    </NavigationContainer>   

  );
}
  
  






