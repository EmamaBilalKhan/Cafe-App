import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import {auth} from './src/screens/Firebase';
import RegisterationScreen from './src/screens/RegisterationScreen';
import HomeStack from './src/TabNavigation/HomeStack';
import LoadingScreen from './src/screens/LoadingScreen';
import {useState, useEffect} from 'react';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import Products from './src/components/Products';
import ConfirmOrderScreen from './src/screens/ConfirmOrderScreen';
import OrderCompletedScreen from './src/screens/OrderCompletedScreen';
import ForgotPassword from './src/screens/ForgotPassword';
import Map from './src/screens/Map';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { useProductStore } from './src/Store/Store';
import EmailVerificationScreen from './src/screens/EmailVerificationScreen';
import EditProfile from './src/screens/EditProfile';
import ContactScreen from './src/screens/ContactScreen';
import SecurityScreen from './src/screens/SecurityScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  const IP = useProductStore(state=>state.IP);
  const [isSignedIn,setIsSignedIn] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  const [userRole,setUserRole]= useState(null)
  const isRegistered = useProductStore((state) => state.IsRegistered);
  const setIsRegistered = useProductStore((state) => state.setIsRegistered);
  const isEmailVerified = useProductStore((state) => state.isEmailVerified);
  const setIsEmailVerified = useProductStore((state) => state.setIsEmailVerified);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const isAuthDataAvailable = await getAuthInfo();
        console.log("Auth data available: ", isAuthDataAvailable);
        user.emailVerified?setIsEmailVerified(true):setIsEmailVerified(false);
        setIsSignedIn(isAuthDataAvailable);
      } else {
        setIsSignedIn(false);
      }
      setIsLoading(false);
    });
  
    return unsubscribe;
  }, []);

  useEffect(()=>{
    console.log("em: ",isEmailVerified);
  },[isEmailVerified])
  
  const getAuthInfo = async () => {
    const user = auth.currentUser;
    console.log("User: ", user);
    if (user) {
      try{
      const idToken = await user.getIdToken();
  
      const response = await fetch(`http://${IP}:3000/Users/LoginUserInformation`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
      });
  
      if (response.ok) {
      const data = await response.json();
      setUserRole(data.userType);
      setIsRegistered(data.isRegistered);
      console.log("User Reg: ", data.isRegistered);
      return !!data;
      }
      else{
        console.log("error: ", response.status)
        return false;
        
      }}
      catch(error){
        console.log("error: ", error)
        return false;
      }
  
      
    } 
    
  };

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {
          isLoading? (
            <LoadingScreen/>
          ):(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          userRole === "customer" ?(
            !isEmailVerified?
            <Stack.Screen name="EmailVerificationScreen" component={EmailVerificationScreen}/>:
            isRegistered?
          <>
            <Stack.Screen name="HomeScreen" component={HomeStack}/>
            <Stack.Screen name='Products' component={Products}/>
            <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen}/>
            <Stack.Screen name="ConfirmOrderScreen" component={ConfirmOrderScreen}/>
            <Stack.Screen name="OrderCompletedScreen" component={OrderCompletedScreen}/>
            <Stack.Screen name="Map" component={Map}/>
            <Stack.Screen name="EditProfile" component={EditProfile}/>
            <Stack.Screen name="ContactScreen" component={ContactScreen}/>
            <Stack.Screen name="SecurityScreen" component={SecurityScreen}/>
          </>:
          <Stack.Screen name="RegisterationScreen" component={RegisterationScreen}/>

        ):
          <>
          
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
  
  





