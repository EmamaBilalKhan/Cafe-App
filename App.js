import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { auth } from './src/screens/Firebase';
import { useProductStore } from './src/Store/Store';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPassword from './src/screens/ForgotPassword';
import EmailVerificationScreen from './src/screens/EmailVerificationScreen';
import RegisterationScreen from './src/screens/RegisterationScreen';

import HomeStack from './src/TabNavigation/HomeStack';
import Products from './src/components/Products';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import ConfirmOrderScreen from './src/screens/ConfirmOrderScreen';
import OrderCompletedScreen from './src/screens/OrderCompletedScreen';
import EditProfile from './src/screens/EditProfile';
import ContactScreen from './src/screens/ContactScreen';
import SecurityScreen from './src/screens/SecurityScreen';

import AdminMainScreen from './src/screens/AdminMainScreen';
import AdminOrderScreen from './src/screens/AdminOrderScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const URL = useProductStore((state) => state.URL);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const isRegistered = useProductStore((state) => state.IsRegistered);
  const setIsRegistered = useProductStore((state) => state.setIsRegistered);
  const isEmailVerified = useProductStore((state) => state.isEmailVerified);
  const setIsEmailVerified = useProductStore((state) => state.setIsEmailVerified);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const isAuthDataAvailable = await getAuthInfo();
          user.emailVerified ? setIsEmailVerified(true) : setIsEmailVerified(false);
          setIsSignedIn(isAuthDataAvailable);
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
      } finally {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const getAuthInfo = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const idToken = await user.getIdToken();
        const response = await fetch(`${URL}/Users/LoginUserInformation`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.userType);
          setIsRegistered(data.isRegistered);
          return true;
        } else {
          console.error("Error fetching user info:", response.status);
          return false;
        }
      } catch (error) {
        console.error("Error in getAuthInfo:", error);
        return false;
      }
    }
    return false;
  };

  const renderAuthScreens = () => (
    <>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </>
  );

  const renderCustomerScreens = () => {
    if (!isEmailVerified) {
      return <Stack.Screen name="EmailVerificationScreen" component={EmailVerificationScreen} />;
    }
    return isRegistered ? (
      <>
        <Stack.Screen name="HomeScreen" component={HomeStack} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
        <Stack.Screen name="ConfirmOrderScreen" component={ConfirmOrderScreen} />
        <Stack.Screen name="OrderCompletedScreen" component={OrderCompletedScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ContactScreen" component={ContactScreen} />
        <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
      </>
    ) : (
      <Stack.Screen name="RegisterationScreen" component={RegisterationScreen} />
    );
  };

  const renderAdminScreens = () => (
    <>
      <Stack.Screen name="AdminMainScreen" component={AdminMainScreen} />
      <Stack.Screen name="AdminOrderScreen" component={AdminOrderScreen} />
    </>
  );

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoading ? (
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          ) : isSignedIn ? (
            userRole === "customer" ? renderCustomerScreens() : renderAdminScreens()
          ) : (
            renderAuthScreens()
          )}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
