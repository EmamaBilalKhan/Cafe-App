import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {auth} from './Firebase.js';
import {signInWithEmailAndPassword} from 'firebase/auth';

export default function LoginScreen({navigation}) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [failedlogin, setFailedLogin] = useState(false);
    const [LoginErr, setLoginErr] = useState('');
    const [fieldsEmpty, setFieldsEmpty] = useState(false);

    async function signInWithEmail() {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log('User Logged in successfully:', response);
        setFailedLogin(false);
      } catch (err) {
        console.error('Login Failed:', err.message);
        setLoginErr(err.message); 
        setFailedLogin(true);
      }
    }
    
    const HandleSignIn = () => {
      setFieldsEmpty(false);
      if (email.trim() !== '' && password.trim() !== '') {
        signInWithEmail();
      } else {
        setFieldsEmpty(true);
      }
    };
    

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="white"/>
    
    <SafeAreaView style={styles.container}>
    <Image source={require("../../assets/coffeelogin.png")} style={styles.coffeimage}/>
    <Text style={styles.LoginWelcomeText}>Welcome! Login to your account</Text>
      <TextInput style={styles.inputfield} placeholder="email@gmail.com"
      value={email}
      onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput style={styles.inputfield} placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}></TextInput>
      <>
      {failedlogin && <Text style={styles.error}>Error Logging in. Try Again.</Text>}
      {LoginErr && <Text style={styles.error}>{LoginErr}</Text>}
      {fieldsEmpty && <Text style={styles.error}>Fill in all fields to login</Text>}
      </>
      <TouchableOpacity onPress={()=>navigation.navigate("ForgotPassword")} ><Text style={styles.forgotpassword}>Forgot Password?</Text></TouchableOpacity>
      <TouchableOpacity style={styles.loginbutton} onPress={HandleSignIn}><Text style={styles.loginbuttontext}>Login</Text></TouchableOpacity>
      <Text style={styles.noaccount}>Don't have an account? <TouchableOpacity style={styles.register} onPress={()=>navigation.navigate("SignUpScreen")}><Text>Register Here.</Text></TouchableOpacity></Text>
    </SafeAreaView>
   
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent:"center"
  },
  coffeimage:{
    marginBottom:hp(2),
    height: hp(20),
    width: wp(38)
  },
  LoginWelcomeText:{
    fontWeight:"bold",
    color:"#74512D",
    fontSize: hp(3),
    marginVertical:hp(2),
    marginHorizontal:wp(5)
  },
  inputfield:{
    width: wp(90),
    height: hp(5),
    marginHorizontal: wp(5),
    marginVertical: hp(2),
    backgroundColor: "#F8F4E1",
    borderRadius: 3,
    paddingHorizontal:wp(2)
    
  },
  loginbutton:{
    width: wp(30),
    height: hp(5),
    marginVertical: hp(2),
    marginHorizontal: wp(25),
    backgroundColor: "#74512D",
    borderRadius: 5,
    paddingVertical: hp(1)
  },
  loginbuttontext:{
    textAlign: "center",
    color: "white",
    fontWeight:"bold"
  },
  noaccount:{
    fontSize: hp(2),
    color: "#74512D",
    marginVertical: hp(2),
    fontWeight:"400"
  },
  register:{
    color: "black",
    fontWeight:"500"
  },
  forgotpassword:{
    color:"#74512D",
    fontSize: hp(2),
    fontWeight:"350",
  },
  error:{
    fontSize: hp(1.8),
    marginHorizontal: wp(5),
    marginVertical: hp(1),
    color: 'red'
  }

});
