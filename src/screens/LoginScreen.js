import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useState} from 'react';
import SignUpScreen from './SignUpScreen';
import {my_auth} from './Firebase.js';
import {signInWithEmailAndPassword} from 'firebase/auth';


export default function LoginScreen({navigation}) {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [failedlogin, setFailedLogin] = useState(false);

  async function signInWithEmail() {
      try{
    const response = await signInWithEmailAndPassword(my_auth, email,password);
    console.log(response);
    setFailedLogin(false);
    
    }
    catch(err)
    {
      console.log(err);
      setFailedLogin(true);   
    }
    }
    
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="white"/>
    
    <View style={styles.container}>
      <Image source="../../assets/coffeelogin.png" style={styles.coffeimage}/>
      <Text style={styles.LoginWelcomeText}>Welcome! Login to your account</Text>
      <TextInput style={styles.inputfield} placeholder='email@gmail.com'
      value={email}
      onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput style={styles.inputfield} placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}></TextInput>
      {failedlogin && <Text style={styles.error}>Error Logging in. Try Again.</Text>}
      <TouchableOpacity style={styles.forgotpassword}>Forgot Password?</TouchableOpacity>
      <TouchableOpacity style={styles.loginbutton} onPress={signInWithEmail}><Text style={styles.loginbuttontext}>Login</Text></TouchableOpacity>
      <Text style={styles.noaccount}>Don't have an account? <TouchableOpacity style={styles.register} onPress={()=>navigation.navigate(SignUpScreen)}><Text>Register Here.</Text></TouchableOpacity></Text>
    </View>
   
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
    height: hp(3),
    marginHorizontal: wp(5),
    marginVertical: hp(2),
    color: 'red'
  }

});
