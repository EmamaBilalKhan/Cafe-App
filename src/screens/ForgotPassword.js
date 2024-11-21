import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPassword({navigation}){
    const [email, setEmail] = useState('');

    return(
      <>
        <StatusBar barStyle="dark-content" backgroundColor="white"/>
        <SafeAreaView style={styles.container}>
         <Ionicons name="chevron-back-circle-sharp" size={hp(4)} color="#74512D" style={styles.backButton} onPress={()=>navigation.goBack()}/>
        <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
        <Text>Enter Your Email. We will send you a mail.</Text>
         <TextInput style={styles.inputfield} placeholder='email@gmail.com'
           value={email}
           onChangeText={(text) => setEmail(text)}
      ></TextInput>
        <TouchableOpacity style={styles.button}><Text style={styles.buttontext}>Send</Text></TouchableOpacity>
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
    paddingVertical: hp(1)
  },
  buttontext:{
    textAlign: "center",
    color: "white",
    fontWeight:"bold"
  },
})