import {StyleSheet, Text, View,Image, TouchableOpacity,TextInput} from "react-native";
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useState } from "react";
import LoginScreen from "./LoginScreen";
import {my_auth} from './Firebase.js';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen({navigation}){

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [num, setNumber] = useState('');
    const [fieldsEmpty, setFieldsEmpty] = useState(false);
    const [accCreated, setaccCreated] = useState(false);
    const [regFailed, setregFailed] = useState(false);

  async function SignUpWithEmail() {
      try{
    const userCredential = await createUserWithEmailAndPassword(my_auth, email,password);
    await my_auth.signOut();
    const user = userCredential.user;
    console.log('User created:', user);
    
    await storeAdditionalUserData(user.uid, username, password, num); 
    setaccCreated(true);
    setregFailed(false);
    } catch(err)
    {
      console.log('Registration Failed'+err);
      setregFailed(true);
    }
    }

    const HandleSignUp = () => {
      if (email !== '' && password !== '' && num !=='' && username!== '') {
       SignUpWithEmail();
      } else {
        setFieldsEmpty(true)
      }
    
    }

    async function storeAdditionalUserData(uid) {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', uid);
      await setDoc(userDocRef, {
        username: username,
        number: num, 
      });
    }

    return(
        <>
    <StatusBar barStyle="dark-content" backgroundColor="white" />
    
    <SafeAreaView style={styles.container}>
    {!accCreated && <>
      <Image source="../../assets/coffeelogin.png" style={styles.coffeimage}/>
      <Text style={styles.RegisterWelcomeText}>Hello, Register here to get started.</Text>
      <TextInput style={styles.inputfield} placeholder='Full Name'
      value={username}
      onChangeText={(text) => setUserName(text)}
      ></TextInput>
      <TextInput style={styles.inputfield} placeholder='email@gmail.com'
      value={email}
      onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput style={styles.inputfield} placeholder='Phone Number'
      value={num}
      onChangeText={(text) => setNumber(text)}
      ></TextInput>
      <TextInput style={styles.inputfield} placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}></TextInput>
      
      {fieldsEmpty && <Text style={styles.errors}>Fill in all the fields</Text>}
      {regFailed && <Text style={styles.errors}>Registration Failed. Try Again.</Text>}
      <TouchableOpacity style={styles.registerbutton} onPress={HandleSignUp}><Text style={styles.registerbuttontext}>Register</Text></TouchableOpacity>
      <Text style={styles.haveaccount}>Already have an account? <TouchableOpacity style={styles.Login} onPress={()=>navigation.navigate(LoginScreen)}><Text>Login Here.</Text></TouchableOpacity></Text>
    </>
    }
    {accCreated && 
    <>
      <Image source="../../assets/tick.png" style={styles.coffeimage}/>
      <Text style={styles.RegisterWelcomeText}>Account created Successfully.</Text>
      <TouchableOpacity style={styles.registerbutton} onPress={()=>navigation.navigate(LoginScreen)}><Text style={styles.registerbuttontext}>Login</Text></TouchableOpacity>
    </>
    }
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
    RegisterWelcomeText:{
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
      registerbutton:{
        width: wp(30),
        height: hp(5),
        marginVertical: hp(2),
        marginHorizontal: wp(25),
        backgroundColor: "#74512D",
        borderRadius: 5,
        paddingVertical: hp(1)
      },
      registerbuttontext:{
        textAlign: "center",
        color: "white",
        fontWeight:"bold"
      },
      haveaccount:{
        fontSize: hp(2),
        color: "#74512D",
        marginTop: hp(3),
        fontWeight:"400"
      },
      Login:{
        color: "black",
        fontWeight:"500"
      },
      errors:{
        height: hp(3),
        marginHorizontal: wp(5),
        marginVertical: hp(2),
        color: 'red'
      },
    
});