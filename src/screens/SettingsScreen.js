import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useState,useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from './Firebase.js';
export default function ProfileScreen(){
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
        backgroundColor: "#74512D",
        borderRadius: 5,
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        bottom:1
    },
    LogoutText:{
        color:"white",
        fontWeight:"bold",
    }
    
})