import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {my_auth} from './Firebase.js';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getFirestore, getDocs, collection, query, where} from 'firebase/firestore';
import { useState,useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen(){
    const user = my_auth.currentUser;
    const [username,setUserName]=useState("")
    const [number,setNumber]=useState("")
    const db = getFirestore();
    const uid = user.uid;

    const signout=()=>{
        my_auth.signOut()
        .then(() => {
        console.log('Signed Out');
        })
        .catch(e=>{
        console.error('Sign Out Error', e);
        });
    }

    

    async function getAdditionalUserData() {
        const usersRef = collection(db, "users");
        try {
          const querySnapshot = await getDocs(usersRef);
          querySnapshot.forEach((doc) => {
            if (doc.id === uid) {
              const userData = doc.data();
              const name = userData.username;
              const num = userData.number;
              setUserName(name);
              setNumber(num);
            }
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      useEffect( () => {
        getAdditionalUserData();
      }, []);

    return(
        <>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <SafeAreaView style={styles.container}>
           <Image source="../../assets/coffeelogin.png" style={styles.coffeimage}/>
           <Text style={styles.info}>Name : <Text style={{color:"black"}}>{username}</Text></Text>
            <Text style={styles.info}>Email: <Text style={{color:"black"}}>{user.email}</Text></Text>
            <Text style={styles.info}>Number: <Text style={{color:"black"}}>{number}</Text></Text>
            <Text style={styles.info}>Password: <Text style={{color:"black"}}>*********</Text></Text>
            <TouchableOpacity style={styles.editbutton}>
                <Entypo name="edit" size={hp(2)} color="#74512D" style={{marginTop:hp(0.5)}}/>
                <Text style={styles.editbuttontext}> Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signout} style={[styles.editbutton, {marginTop:hp(5)}]}>
                <MaterialCommunityIcons name="logout-variant" size={hp(2)} color="#74512D" style={{marginTop:hp(0.5)}}/>
                <Text style={styles.editbuttontext}> Sign Out</Text>
            </TouchableOpacity>
            <View style={styles.contact}>
              <Text style={[styles.Contactinfo,{color:"#74512D",fontSize: hp(2)}]}>Contact: </Text>
              <Text style={styles.Contactinfo}>000-111-222-333</Text>
              <Text style={styles.Contactinfo}>helpline@gmail.com</Text>
            </View>
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
        flexWrap:"wrap",
        justifyContent:"center"
    },
    coffeimage:{
        marginBottom:hp(2),
        height: hp(20),
        width: wp(38),
        alignSelf:"center"
    },
    info:{
        marginVertical:hp(1),
        fontWeight:"bold",
        fontSize: hp(2),
        color:"#74512D",
    },
    editbutton:{
        marginVertical: hp(1),
        alignSelf:"flex-end",
        flexDirection:"row",
        marginRight:wp(2)
      },
      editbuttontext:{
        textAlign: "center",
        color: "#74512D",
        fontWeight:"bold",
        fontSize: hp(2),
      },
      contact:{
        marginTop: hp(10)
      },
      Contactinfo:{
        marginVertical:hp(0.5),
        fontWeight:"bold",
        fontSize: hp(1.5)
    }
})