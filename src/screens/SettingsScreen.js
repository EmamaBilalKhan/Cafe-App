import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useState,useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from './Firebase.js';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function ProfileScreen(){
    const navigation=useNavigation();
    const [username,setUserName]=useState("")
    const [number,setNumber]=useState("")

    const handleSignout=async()=>{
        await auth.signOut().then(()=>{
          console.log("User Logged Out")

        }).catch((error)=>{
            console.log("Log out error: ", error)
        })
    }

    

    async function getAdditionalUserData() {
        
      }

      useEffect( () => {
        getAdditionalUserData();
      }, []);

    return(
        <>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <SafeAreaView style={styles.container}>
        <Image source={require("../../assets/coffeelogin.png")} style={styles.coffeimage}/>
        <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("EditProfile")}>
            <View style={styles.buttonstartView}>
                <MaterialCommunityIcons name="account" size={hp(4)} color="#7B7B7C"/>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </View>
            <MaterialIcons name="navigate-next" size={hp(4)} color="#7B7B7C"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("SecurityScreen")}>
            <View style={styles.buttonstartView}>
                <MaterialIcons name="security" size={hp(3.3)} color="#7B7B7C"/>
                <Text style={styles.buttonText}>Security</Text>
            </View>
            <MaterialIcons name="navigate-next" size={hp(4)} color="#7B7B7C"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("ContactScreen")}>
            <View style={styles.buttonstartView}>
            <Ionicons name="call" size={hp(3.2)} color="#7B7B7C"/>
            <Text style={styles.buttonText}>Contact Us</Text>
            </View>
            <MaterialIcons name="navigate-next" size={hp(4)} color="#7B7B7C"/>
        </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSignout} style={styles.LogOutButton}><Text style={styles.LogoutText}>Log Out</Text></TouchableOpacity>
        </SafeAreaView>   
        </> 
        );
    
    
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        paddingHorizontal:wp(2),
        paddingTop:hp(3),
        justifyContent:"center",
        alignItems:"center",
        position:"relative"
    },
    coffeimage:{
        marginBottom:hp(2),
        height: hp(10),
        width: wp(20),
    },
    LogOutButton:{
        width: wp(30),
        height: hp(5),
        marginVertical: hp(2),
        marginHorizontal: wp(25),
        backgroundColor: "#EBEDF3",
        borderRadius: 5,
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        bottom:1
    },
    LogoutText:{
        color:"#a1020a",
        fontWeight:"bold",
    },
    buttons:{
        marginTop:hp(6),
        marginHorizontal:wp(5)
      },
      button:{
        width:wp(90),
        height:hp(6),
        backgroundColor:"#EBEDF3",
        borderRadius:hp(1.5),
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:wp(4),
        marginBottom:hp(2)
      },
      buttonstartView:{
        flexDirection:"row",
        alignItems:"center",
        width:wp(60),
      },
      buttonText:{
        fontSize:hp(2.3),
        fontWeight:"550",
        color:"#888885",
        marginLeft:wp(5)
      },
    
})