import { StatusBar } from 'expo-status-bar';
import { ScrollView,StyleSheet, Text, View, TextInput, TouchableOpacity,Image} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {useEffect, useState } from 'react';
import {auth} from './Firebase.js';
import { sendEmailVerification } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import {SimpleLineIcons} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useProductStore } from '../Store/Store.js';
export default function EmailVerificationScreen(){
    const setIsEmailVerified = useProductStore((state) => state.setIsEmailVerified);
    const [Error,setError]=useState("");

    useEffect(()=>{
        handleResendVerification();
    },[]);

    const handleResendVerification = async () => {
        setError("");
        try {
            const user = auth.currentUser;
            if (user) {
                await sendEmailVerification(user);
                console.log("Verification email sent");
                return true;
            } else {
                console.log("No user is logged in.");
                setError("No user is logged in. Please log in to send verification email.");
            }
        } catch (error) {
            console.log("Error sending verification email: ", error);
            setError("An error occurred. Please try again.");
        }
    };
    const handleVerification = async () => {
        setError("");
        try {
            const user = auth.currentUser;
            if (user) {
                await user.reload();
                if (user.emailVerified) {
                    console.log("Email Verified");
                    setIsEmailVerified(true);
                } else {
                    console.log("Email not verified");
                    setError("Email not verified. Please check your email and verify your account.");
                }
            } else {
                console.log("No user is logged in.");
                setError("No user is logged in. Please log in to verify your email.");
            }
        } catch (error) {
            console.log("Error during verification: ", error);
            setError("An error occurred. Please try again.");
        }
    };
    
    const handleResend = async () => {
        setError("");
        const success = await handleResendVerification();
        if (success) {
            console.log("Verification email resent successfully");
            setError("Verification email sent. Please check your email and verify your account.");
        } else {
            console.log("Failed to resend verification email");
        }
    };

    const handleLogout = async () => {
        await auth.signOut().then(()=>{
            console.log("User Logged Out")
  
          }).catch((error)=>{
              console.log("Log out error: ", error)
          })
    }
return(
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Image source={require("../../assets/coffeelogin.png")} style={styles.coffeimage}/>
        <Text style={styles.VerifyText}>An email has been sent to your email address. Please click on the link in the email to verify your account. Once verified, you can continue to use our service.</Text>
        {Error && <Text style={styles.error}>{Error}</Text>}
        <TouchableOpacity style={styles.ResendButton} onPress={handleResend}>
            <Text style={styles.ResendText}>Resend Verification Email</Text>
        </TouchableOpacity>
        <View style={styles.Buttons}>
                <TouchableOpacity style={styles.LogoutButton} onPress={handleLogout}>
                    <SimpleLineIcons name="logout" style={[styles.ButtonIcon]}  size={hp(2.3)} color="#a1020a" />
                    <Text style={styles.LogoutButtonText}> Log out</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={handleVerification}>
                    <Text style={styles.submitButtonText}>Next</Text>
                    <Ionicons name="arrow-forward-circle-outline" style={[styles.ButtonIcon, {paddingTop:hp(0.2)}]}  size={hp(3)} color="#74512D" />
                </TouchableOpacity>
        </View>
    </SafeAreaView>
)
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingVertical: hp(2),
        alignItems: "center",
        position:"relative"
    },
    VerifyText: {
        fontWeight:"800",
        color:"#74512D",
        fontSize: hp(2),
        marginVertical:hp(2),
        marginHorizontal:wp(5)
    },
    error:{
        color:"red",
        fontSize:hp(2.2),
        marginVertical:hp(2),
        marginHorizontal:wp(2)
    },
    coffeimage:{
        marginBottom:hp(2),
        height: hp(20),
        width: wp(38)
      },
      Buttons:{
        flexDirection:"row",
        marginVertical: hp(2.5),
        justifyContent:"space-between",
        width:wp(90),
        position:"absolute",
        bottom:hp(2)
    },
    submitButton: {
        alignItems: "center",
        flexDirection: "row",
    },
    submitButtonText: {
        color: "#74512D",
        fontSize: hp(2.7),
        fontWeight: "bold",
    },
    
    ButtonIcon:{
        marginTop:hp(0.2),
        marginHorizontal:wp(0.4)
    },
    LogoutButton: {
        alignItems: "center",
        flexDirection: "row",
    },
    LogoutButtonText: {
        color: "#a1020a",
        fontSize: hp(2.5),
        fontWeight: "bold",
    },
    ResendButton:{
        alignItems:"center",
        justifyContent:"center",
        width:wp(90),
        height:hp(5),
        backgroundColor:"#74512D",
        borderRadius:5,
        marginVertical:hp(2)
    },
    ResendText:{
        color:"white",
        fontWeight:"bold",
        fontSize:hp(2.5)
    }
})