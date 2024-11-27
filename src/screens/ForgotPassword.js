import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProductStore } from '../Store/Store';
export default function ForgotPassword({navigation}){
    const [email, setEmail] = useState('');
    const [Error, setError] = useState('');

    const URL = useProductStore((state) => state.URL);
    const handleForgotPassword = async() => {
      setError("")
      if(email===""){
        setError("Please enter your email");
        return;
      }
      try{
        const response = await fetch(`${URL}/Users/resetPassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        if(response.ok){
          setError("Email sent successfully");
        }
        else{
          setError("Error sending email");
        }
      }
      catch(error){
        console.log("Error: ", error);
        setError("Error sending email");
      } 
    }
    return(
      <>
        <StatusBar barStyle="dark-content" backgroundColor="white"/>
        <SafeAreaView style={styles.container}>
        <Ionicons name="arrow-back-sharp" size={hp(4)} color="#74512D" style={styles.backButton} onPress={() => navigation.goBack()} />

        <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
        <Text>Enter Your Email. We will send you a mail.</Text>
         <TextInput style={styles.inputfield} placeholder='email@gmail.com'
           value={email}
           onChangeText={(text) => setEmail(text)}
      ></TextInput>
        <TouchableOpacity onPress={handleForgotPassword} style={styles.button}><Text style={styles.buttontext}>Send</Text></TouchableOpacity>
        <>{Error && <Text style={styles.error}>{Error}</Text>}</>
        </View>
      </SafeAreaView>
      </>
    );
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'white',
  },
  error:{
    color:"red",
    fontSize:hp(2.2),
    marginVertical:hp(2),
    marginHorizontal:wp(3)
},
  backButton:{
    
        marginLeft: wp(1),
        marginTop:hp(2)
      
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
  button:{
    width: wp(30),
    height: hp(5),
    marginVertical: hp(2),
    marginHorizontal: wp(25),
    backgroundColor: "#74512D",
    borderRadius: 5,
    alignItems:"center",
    justifyContent:"center"
  },
  buttontext:{
    textAlign: "center",
    color: "white",
    fontWeight:"bold",
    fontSize:hp(2)
  },
})