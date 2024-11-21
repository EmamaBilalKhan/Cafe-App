import {StyleSheet, Text,Image, TouchableOpacity,TextInput, ScrollView} from "react-native";
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useState } from "react";
import LoginScreen from "./LoginScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProductStore } from "../Store/Store";

export default function SignUpScreen({navigation}){

    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fieldsEmpty, setFieldsEmpty] = useState(false);
    const [accCreated, setaccCreated] = useState(false);
    const [regFailed, setregFailed] = useState(false);
    const [SignUpErr, setSignUpErr] = useState("");
    const IP = useProductStore((state) => state.IP);

    async function SignUpWithEmail() {
      console.log("cred: ", email,password);
        try {
            const response = await fetch(`http://${IP}:3000/Users/SignUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            });

          const data = await response.json();
          if (response.ok) {
            console.log('User created successfully:', data);
            setaccCreated(true);
          }
          else{
            console.log('User creation Failed by Backend:', data.error);
            setSignUpErr(data.error);
            setregFailed(true);}
        } catch (err) {
            console.log('User Creation Failed:', err);
            setregFailed(true);
        }
    }
    

    const HandleSignUp = () => {
      setFieldsEmpty(false);
      if (email !== '' && password !== '' && ConfirmPassword!=="") {
        if(!(password===ConfirmPassword)){
          setSignUpErr("Password and Confirm Password do not match");
        }
        else{
          SignUpWithEmail();
        }
      } else {
        setFieldsEmpty(true)
      }
    
    }

    return(
        <>
    <StatusBar barStyle="dark-content" backgroundColor="white" />
    <SafeAreaView style={styles.SafeAreaView}>
    <ScrollView contentContainerStyle={styles.container}>
    {!accCreated && <>
      <Image source={require("../../assets/coffeelogin.png")} style={styles.coffeimage}/>
      <Text style={styles.RegisterWelcomeText}>Hello, Register here to get started.</Text>
      
      <TextInput style={styles.inputfield} placeholder='email@gmail.com'
      value={email}
      onChangeText={(text) => setEmail(text)}
      ></TextInput>
      
      <TextInput style={styles.inputfield} placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}></TextInput>
      <TextInput style={styles.inputfield} placeholder="Confirm Password"
        secureTextEntry={true}
        value={ConfirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}></TextInput>
      {fieldsEmpty && <Text style={styles.errors}>Fill in all the fields</Text>}
      {regFailed && <><Text style={styles.errors}>Registration Failed. Try Again.</Text>
      <Text style={styles.errors}>{SignUpErr}</Text>
      </>
      }
      <TouchableOpacity style={styles.registerbutton} onPress={HandleSignUp}><Text style={styles.registerbuttontext}>Register</Text></TouchableOpacity>
      <Text style={styles.haveaccount}>Already have an account? <TouchableOpacity style={styles.Login} onPress={()=>navigation.navigate(LoginScreen)}><Text>Login Here.</Text></TouchableOpacity></Text>
    </>
    }
    {accCreated && 
    <>
      <Image source={require("../../assets/coffeelogin.png")} style={styles.tickimage}/>
      <Text style={styles.RegisterWelcomeText}>Account created Successfully.</Text>
      <TouchableOpacity style={[styles.registerbutton, styles.LoginButton ]} onPress={()=>navigation.navigate(LoginScreen)}><Text style={styles.registerbuttontext}>Login</Text></TouchableOpacity>
    </>
    }
    </ScrollView>
    </SafeAreaView>
   
    </>
    );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent:"center"
    },
    SafeAreaView:{
      backgroundColor:"white",
      flex:1
    },
    coffeimage:{
      marginBottom:hp(2),
      height: hp(20),
      width: wp(38)
    },
    tickimage:{
      marginBottom:hp(2),
      height: hp(20),
      width: wp(40)
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
      LoginButton:{
        backgroundColor:"#574118"
      },
      registerbuttontext:{
        textAlign: "center",
        color: "white",
        fontWeight:"bold"
      },
      haveaccount:{
        fontSize: hp(2),
        color: "#74512D",
        fontWeight:"400",
        marginBottom:hp(3)
      },
      Login:{
        color: "black",
        fontWeight:"500"
      },
      errors:{
        height: hp(3),
        marginHorizontal: wp(5),
        marginVertical: hp(0.5),
        color: 'red'
      },
    
});